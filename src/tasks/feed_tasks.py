from typing import List
from src.celery_app import celery_app
from src.helpers.redis_client import get_redis
from src.helpers.settings import settings
from src.database.connection import router


@celery_app.task(name="feed.fanout_post_created", acks_late=True)
def fanout_post_created(post_id: int, author_id: int) -> int:
    import asyncio

    async def _run() -> int:
        # найдём подписчиков автора
        query = "SELECT user_id FROM otus_hw.users_friends WHERE friend_id = $1"
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, author_id)
            follower_ids: List[int] = [int(r["user_id"]) for r in rows]
        if not follower_ids:
            return 0

        r = await get_redis()
        pipe = r.pipeline()
        for uid in follower_ids:
            pipe.zadd(f"feed:{uid}", {post_id: post_id})
            pipe.zremrangebyrank(f"feed:{uid}", 0, -settings.feed_max_size - 1)
        await pipe.execute()
        return len(follower_ids)

    return asyncio.run(_run())


@celery_app.task(name="feed.friend_added", acks_late=True)
def friend_added(user_id: int, friend_id: int) -> int:
    import asyncio

    async def _run() -> int:
        # бэкфилл последних M постов друга
        query = """
        SELECT id
        FROM otus_hw.posts
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT $2
        """
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, friend_id, settings.feed_backfill_size)
            post_ids = [int(r["id"]) for r in rows]

        if not post_ids:
            return 0

        r = await get_redis()
        pipe = r.pipeline()
        for pid in post_ids:
            pipe.zadd(f"feed:{user_id}", {pid: pid})
        pipe.zremrangebyrank(f"feed:{user_id}", 0, -settings.feed_max_size - 1)
        await pipe.execute()
        return len(post_ids)

    return asyncio.run(_run())


@celery_app.task(name="feed.friend_removed", acks_late=True)
def friend_removed(user_id: int, friend_id: int) -> int:
    # по умолчанию ничего не удаляем — лента хранит id; можно реализовать чистку последних K постов автора
    return 0


