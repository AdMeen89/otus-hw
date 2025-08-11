import asyncio
import json
from typing import List
from aiokafka import AIOKafkaConsumer
from src.helpers.redis_client import get_redis
from src.helpers.settings import settings
from src.database.connection import router


class FeedKafkaWorker:
    def __init__(self, brokers: str = "redpanda:9092") -> None:
        self.brokers = brokers

    async def run(self) -> None:
        consumer = AIOKafkaConsumer(
            "feed.posts",
            bootstrap_servers=self.brokers.split(","),
            enable_auto_commit=False,
            group_id="feed_fanout",
            auto_offset_reset="latest",
        )
        await consumer.start()
        try:
            async for msg in consumer:
                data = json.loads(msg.value)
                await self.handle_post_created(int(data["post_id"]), int(data["author_id"]))
                await consumer.commit()
        finally:
            await consumer.stop()

    async def handle_post_created(self, post_id: int, author_id: int) -> None:
        query = "SELECT user_id FROM otus_hw.users_friends WHERE friend_id = $1"
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, author_id)
            follower_ids: List[int] = [int(r["user_id"]) for r in rows]
        if not follower_ids:
            return
        r = await get_redis()
        pipe = r.pipeline()
        for uid in follower_ids:
            pipe.zadd(f"feed:{uid}", {post_id: post_id})
            pipe.zremrangebyrank(f"feed:{uid}", 0, -settings.feed_max_size - 1)
        await pipe.execute()


