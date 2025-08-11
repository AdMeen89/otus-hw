from fastapi import HTTPException
from src.models.post import Post
from src.providers.post_provider import PostProvider
from src.service.event_bus import KafkaEventBus
from src.helpers.redis_client import get_redis
from src.helpers.logger import logger

class PostService:
    def __init__(self) -> None:
        self.post_provider = PostProvider()
        self.event_bus = KafkaEventBus()

    async def create_post(self, user_id: int, text: str) -> Post:
        inserted_post = await self.post_provider.create(user_id, text)
        await self.event_bus.publish_post_created({
            "post_id": inserted_post["id"],
            "author_id": inserted_post["user_id"],
            "created_at": inserted_post["created_at"].isoformat(),
        })
        return Post(**inserted_post)

    async def update_post(self, user_id: int, text: str) -> Post:
        updated_post = await self.post_provider.update(user_id, text)
        # обновим кэш поста
        r = await get_redis()
        await r.setex(f"post:{updated_post['id']}", 7 * 24 * 3600, str(updated_post))
        logger.info(f"feed_cache: post {updated_post['id']} updated → cache overwritten")
        return Post(**updated_post)
    
    async def delete_post(self, user_id: int, post_id: int) -> None:
        # сначала удаляем из БД
        await self.post_provider.delete(user_id, post_id)
        # инвалидация кэша поста
        r = await get_redis()
        deleted = await r.delete(f"post:{post_id}")
        if deleted:
            logger.info(f"feed_cache: post {post_id} deleted → cache invalidated")
        else:
            logger.info(f"feed_cache: post {post_id} deleted → cache key absent")
        # событие для очистки лент
        await self.event_bus.publish_post_deleted({
            "post_id": post_id,
            "author_id": user_id,
        })

    async def get_post(self, post_id: int) -> Post:
        post = await self.post_provider.get(post_id)
        if post is None:
            raise HTTPException(status_code=404, detail="Post not found")
        return Post(**post)