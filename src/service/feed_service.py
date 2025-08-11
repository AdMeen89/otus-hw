from typing import List, Optional
from src.models.post import Post
from src.providers.feed_provider import FeedProvider
from src.service.feed_cache import FeedCache


class FeedService:
    def __init__(self) -> None:
        self.provider = FeedProvider()
        self.cache = FeedCache()

    async def get_feed(self, user_id: int, limit: int = 20, cursor: Optional[int] = None) -> List[Post]:
        ids = await self.cache.get_feed_ids(user_id, limit, cursor)
        rows = await self.cache.get_posts_batch(ids)
        if not rows:
            # fallback: из БД
            rows = await self.provider.get_feed(user_id, limit, offset=0)
        return [Post(**r) for r in rows]


