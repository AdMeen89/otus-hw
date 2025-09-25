from contextlib import asynccontextmanager
from typing import List, Optional

import asyncpg


class ShardRouter:
    """
    Citus router: подключается к Citus coordinator, который автоматически
    маршрутизирует запросы к нужным workers на основе shard key.
    """

    def __init__(self, shard_dsns: List[str]):
        if not shard_dsns:
            raise ValueError("Shard DSNs list is empty")
        # Для Citus используем только первый DSN (coordinator)
        self._dsn = shard_dsns[0]
        self._pool: Optional[asyncpg.Pool] = None

    async def initialize(self) -> None:
        self._pool = await asyncpg.create_pool(
            self._dsn, 
            min_size=1, 
            max_size=10, 
            command_timeout=60
        )

    async def close(self) -> None:
        if self._pool:
            await self._pool.close()

    @staticmethod
    def _norm_pair(a: int, b: int) -> tuple[int, int]:
        return (a, b) if a <= b else (b, a)

    def _pair_key(self, a: int, b: int) -> int:
        """Генерирует pair_key для Citus sharding"""
        x, y = self._norm_pair(a, b)
        return (x << 32) | y

    @asynccontextmanager
    async def acquire(self, from_user: int, to_user: int):
        if self._pool is None:
            raise RuntimeError("Shard pool not initialized")
        async with self._pool.acquire() as conn:
            yield conn


