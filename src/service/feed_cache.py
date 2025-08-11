from typing import List, Dict, Any, Optional
from src.helpers.redis_client import get_redis
from src.helpers.settings import settings
from src.database.connection import router
from src.helpers.logger import logger


class FeedCache:
    async def get_feed_ids(self, user_id: int, limit: int, offset: int = 0) -> List[int]:
        r = await get_redis()
        start_rank = max(offset, 0)
        end_rank = start_rank + max(limit, 0) - 1 if limit > 0 else -1
        # возвращаем по убыванию времени
        ids = await r.zrevrange(f"feed:{user_id}", start_rank, end_rank)
        return [int(x) for x in ids]

    async def get_posts_batch(self, post_ids: List[int]) -> List[Dict[str, Any]]:
        if not post_ids:
            return []
        redis_client = await get_redis()
        pipe = redis_client.pipeline()
        for pid in post_ids:
            pipe.get(f"post:{pid}")
        values = await pipe.execute()
        missing: List[int] = []
        result: List[Dict[str, Any]] = []
        import json
        for pid, val in zip(post_ids, values):
            if val is None:
                missing.append(pid)
            else:
                try:
                    result.append(json.loads(val))
                except Exception:
                    result.append(eval(val))
        hits = len(post_ids) - len(missing)
        if hits:
            logger.info(f"feed_cache: cache hit for {hits}/{len(post_ids)} posts")
        if missing:
            placeholders = ",".join(["$%d" % (i + 1) for i in range(len(missing))])
            query = f"SELECT * FROM otus_hw.posts WHERE id IN ({placeholders})"
            async with router.get_connection(query) as conn:
                rows = await conn.fetch(query, *missing)
                for row in rows:
                    result.append(dict(row))
            # прогреть кэш
            pipe = redis_client.pipeline()
            for row in rows:
                import json
                pipe.setex(f"post:{row['id']}", 7 * 24 * 3600, json.dumps(dict(row)))
            await pipe.execute()
            logger.info(f"feed_cache: cache miss for {len(missing)} posts → hydrated and setex {len(missing)} keys")
        # сохранить порядок
        result_map = {int(r["id"]): r for r in result}
        return [result_map[pid] for pid in post_ids if pid in result_map]


