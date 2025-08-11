from typing import List, Dict, Any, Optional
from src.helpers.redis_client import get_redis
from src.helpers.settings import settings
from src.database.connection import router


class FeedCache:
    async def get_feed_ids(self, user_id: int, limit: int, cursor: Optional[int] = None) -> List[int]:
        r = await get_redis()
        start = "(\"{}\"".format(cursor) if cursor is not None else "+inf"
        # упрощенный курсор: используем ZREVRANGE по rank
        ids = await r.zrevrange(f"feed:{user_id}", 0, limit - 1)
        return [int(x) for x in ids]

    async def get_posts_batch(self, post_ids: List[int]) -> List[Dict[str, Any]]:
        if not post_ids:
            return []
        r = await get_redis()
        pipe = r.pipeline()
        for pid in post_ids:
            pipe.get(f"post:{pid}")
        values = await pipe.execute()
        missing: List[int] = []
        result: List[Dict[str, Any]] = []
        for pid, val in zip(post_ids, values):
            if val is None:
                missing.append(pid)
            else:
                result.append(eval(val))  # ожидаем, что там str(dict); позже заменим на json
        if missing:
            placeholders = ",".join(["$%d" % (i + 1) for i in range(len(missing))])
            query = f"SELECT * FROM otus_hw.posts WHERE id IN ({placeholders})"
            async with router.get_connection(query) as conn:
                rows = await conn.fetch(query, *missing)
                for r in rows:
                    result.append(dict(r))
            # прогреть кэш
            pipe = r.pipeline()
            for r in rows:
                pipe.setex(f"post:{r['id']}", 7 * 24 * 3600, str(dict(r)))
            await pipe.execute()
        # сохранить порядок
        result_map = {int(r["id"]): r for r in result}
        return [result_map[pid] for pid in post_ids if pid in result_map]


