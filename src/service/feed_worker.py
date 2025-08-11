import asyncio
from typing import Any, Dict, List
from src.helpers.redis_client import get_redis
from src.helpers.settings import settings
from src.helpers.logger import logger
from src.database.connection import router


class FeedFanoutWorker:
    def __init__(self, group: str = "feed_fanout", consumer: str = "c1") -> None:
        self.group = group
        self.consumer = consumer

    async def ensure_group(self) -> None:
        r = await get_redis()
        try:
            await r.xgroup_create(settings.feed_stream_posts, self.group, id="$", mkstream=True)
        except Exception:
            pass

    async def run(self) -> None:
        await self.ensure_group()
        r = await get_redis()
        while True:
            try:
                resp = await r.xreadgroup(self.group, self.consumer, streams={settings.feed_stream_posts: ">"}, count=100, block=1000)
                if not resp:
                    continue
                for stream, messages in resp:
                    for msg_id, data in messages:
                        await self.handle_post_created(data)
                        await r.xack(settings.feed_stream_posts, self.group, msg_id)
            except Exception as e:
                logger.error(f"Feed worker error: {e}")
                await asyncio.sleep(1)

    async def handle_post_created(self, data: Dict[str, Any]) -> None:
        author_id = int(data["author_id"]) if isinstance(data.get("author_id"), str) else data.get("author_id")
        post_id = int(data["post_id"]) if isinstance(data.get("post_id"), str) else data.get("post_id")
        # находим подписчиков автора
        query = "SELECT user_id FROM otus_hw.users_friends WHERE friend_id = $1"
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, author_id)
            follower_ids: List[int] = [int(r["user_id"]) for r in rows]

        if not follower_ids:
            return

        # фан-аут в Redis: добавляем пост в ленты подписчиков
        r = await get_redis()
        pipe = r.pipeline()
        for uid in follower_ids:
            pipe.zadd(f"feed:{uid}", {post_id: post_id})  # упрощенно: score=post_id; лучше score=timestamp
            pipe.zremrangebyrank(f"feed:{uid}", 0, -settings.feed_max_size - 1)
        await pipe.execute()


