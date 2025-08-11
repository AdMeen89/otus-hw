import asyncio
import json
from typing import List
from datetime import datetime
from aiokafka import AIOKafkaConsumer
from src.helpers.redis_client import get_redis
from src.helpers.settings import settings
from src.database.connection import router
from src.helpers.logger import logger


class FeedKafkaWorker:
    def __init__(self, brokers: str = "redpanda:9092") -> None:
        self.brokers = brokers

    async def run(self) -> None:
        posts_consumer = AIOKafkaConsumer(
            "feed.posts",
            bootstrap_servers=self.brokers.split(","),
            enable_auto_commit=False,
            group_id="feed_fanout_posts",
            auto_offset_reset="earliest",
        )
        friends_consumer = AIOKafkaConsumer(
            "feed.friendships",
            bootstrap_servers=self.brokers.split(","),
            enable_auto_commit=False,
            group_id="feed_fanout_friends",
            auto_offset_reset="earliest",
        )
        await posts_consumer.start()
        await friends_consumer.start()
        try:
            tasks = [self._consume_posts(posts_consumer), self._consume_friends(friends_consumer)]
            await asyncio.gather(*tasks)
        finally:
            await posts_consumer.stop()
            await friends_consumer.stop()

    async def _consume_posts(self, consumer: AIOKafkaConsumer) -> None:
        async for msg in consumer:
            try:
                data = json.loads(msg.value)
                if data.get("type") == "deleted":
                    await self.handle_post_deleted(int(data["post_id"]), int(data["author_id"]))
                else:
                    created_at = data.get("created_at")
                    await self.handle_post_created(int(data["post_id"]), int(data["author_id"]), created_at)
                await consumer.commit()
            except Exception as e:
                logger.error(f"_consume_posts error: {e}")

    async def _consume_friends(self, consumer: AIOKafkaConsumer) -> None:
        async for msg in consumer:
            try:
                data = json.loads(msg.value)
                if data.get("type") == "added":
                    await self.handle_friend_added(int(data["user_id"]), int(data["friend_id"]))
                elif data.get("type") == "removed":
                    await self.handle_friend_removed(int(data["user_id"]), int(data["friend_id"]))
                await consumer.commit()
            except Exception as e:
                logger.error(f"_consume_friends error: {e}")

    async def handle_post_created(self, post_id: int, author_id: int, created_at: str | None) -> None:
        query = "SELECT user_id FROM otus_hw.users_friends WHERE friend_id = $1"
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, author_id)
            follower_ids: List[int] = [int(r["user_id"]) for r in rows]
        if not follower_ids:
            return
        r = await get_redis()
        # вычисляем score как unix timestamp (секунды)
        try:
            score = datetime.fromisoformat(created_at).timestamp() if created_at else float(post_id)
        except Exception:
            score = float(post_id)
        pipe = r.pipeline()
        for uid in follower_ids:
            pipe.zadd(f"feed:{uid}", {post_id: score})
        await pipe.execute()
        # trimming: remove oldest if size > max
        pipe = r.pipeline()
        for uid in follower_ids:
            pipe.zcard(f"feed:{uid}")
        sizes = await pipe.execute()
        pipe = r.pipeline()
        for uid, size in zip(follower_ids, sizes):
            if int(size) > settings.feed_max_size:
                excess = int(size) - settings.feed_max_size
                pipe.zremrangebyrank(f"feed:{uid}", 0, excess - 1)
        await pipe.execute()

    async def handle_post_deleted(self, post_id: int, author_id: int) -> None:
        query = "SELECT user_id FROM otus_hw.users_friends WHERE friend_id = $1"
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, author_id)
            follower_ids: List[int] = [int(r["user_id"]) for r in rows]
        if not follower_ids:
            return
        r = await get_redis()
        pipe = r.pipeline()
        for uid in follower_ids:
            pipe.zrem(f"feed:{uid}", post_id)
        await pipe.execute()

    async def handle_friend_added(self, user_id: int, friend_id: int) -> None:
        # бэкфилл последних M постов друга в ленту user_id
        query = """
        SELECT id, created_at
        FROM otus_hw.posts
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
        """
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, friend_id, settings.feed_backfill_size)
        if not rows:
            return
        r = await get_redis()
        pipe = r.pipeline()
        for row in rows:
            try:
                score = float(datetime.fromisoformat(str(row["created_at"])) .timestamp())
            except Exception:
                score = float(row["id"])
            pipe.zadd(f"feed:{user_id}", {int(row["id"]): score})
        await pipe.execute()
        size = await r.zcard(f"feed:{user_id}")
        if int(size) > settings.feed_max_size:
            excess = int(size) - settings.feed_max_size
            await r.zremrangebyrank(f"feed:{user_id}", 0, excess - 1)

    async def handle_friend_removed(self, user_id: int, friend_id: int) -> None:
        # удаляем последние K постов друга из ленты пользователя
        query = """
        SELECT id
        FROM otus_hw.posts
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
        """
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, friend_id, settings.feed_backfill_size)
            post_ids: List[int] = [int(r["id"]) for r in rows]
        if not post_ids:
            return
        r = await get_redis()
        pipe = r.pipeline()
        for pid in post_ids:
            pipe.zrem(f"feed:{user_id}", pid)
        await pipe.execute()


