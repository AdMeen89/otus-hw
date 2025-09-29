import time
import uuid
from collections.abc import AsyncIterator

from redis.asyncio import Redis


class HotPairsProvider:
    """Управляет счётчиками активности пар пользователей в Redis."""

    def __init__(
        self,
        redis_url: str,
        *,
        window_sec: int,
        promote_threshold: int,
        active_ttl_sec: int | None = None,
    ) -> None:
        self._redis = Redis.from_url(redis_url)
        self._window_sec = window_sec
        self._promote_threshold = promote_threshold
        self._active_ttl_sec = active_ttl_sec or window_sec
        self._activity_prefix = "hot_pairs:activity"
        self._active_prefix = "hot_pairs:active"

    async def close(self) -> None:
        await self._redis.close()
        await self._redis.connection_pool.disconnect()

    async def record_message(self, pair_key: int) -> int:
        """Записывает событие и возвращает количество сообщений в окне."""
        now = time.time()
        member = f"{now}:{uuid.uuid4().hex}"
        score = now
        activity_key = self._activity_key(pair_key)

        async with self._redis.pipeline(transaction=True) as pipe:
            pipe.zadd(activity_key, {member: score})
            pipe.zremrangebyscore(activity_key, "-inf", now - self._window_sec)
            pipe.expire(activity_key, self._window_sec)
            pipe.zcard(activity_key)
            results = await pipe.execute()

        count = int(results[-1])

        if count >= self._promote_threshold:
            await self._redis.set(self._active_key(pair_key), 1, ex=self._active_ttl_sec)

        return count

    async def demote(self, pair_key: int) -> None:
        await self._redis.delete(self._active_key(pair_key))

    async def is_hot_pair(self, pair_key: int) -> bool:
        return bool(await self._redis.exists(self._active_key(pair_key)))

    async def iter_hot_pairs(self, batch_size: int = 100) -> AsyncIterator[int]:
        pattern = f"{self._active_prefix}:*"
        cursor = 0
        while True:
            cursor, keys = await self._redis.scan(cursor=cursor, match=pattern, count=batch_size)
            for key in keys:
                if isinstance(key, bytes):
                    key = key.decode()
                yield int(key.rsplit(":", 1)[-1])
            if cursor == 0:
                break

    async def get_hot_pairs(self) -> list[int]:
        return [pair async for pair in self.iter_hot_pairs()]

    def _activity_key(self, pair_key: int) -> str:
        return f"{self._activity_prefix}:{pair_key}"

    def _active_key(self, pair_key: int) -> str:
        return f"{self._active_prefix}:{pair_key}"
