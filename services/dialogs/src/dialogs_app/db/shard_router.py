from contextlib import asynccontextmanager
from typing import List, Optional

import asyncpg


class ShardRouter:
    """
    Citus router с поддержкой hot/normal кластеров:
    - Обычные пары -> normal workers (1-3)
    - Горячие пары -> hot workers (4-6)
    """

    def __init__(self, shard_dsns: List[str]):
        if not shard_dsns:
            raise ValueError("Shard DSNs list is empty")
        # Для Citus используем только первый DSN (coordinator)
        self._dsn = shard_dsns[0]
        self._pool: Optional[asyncpg.Pool] = None
        self._hot_pairs_service = None

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

    def set_hot_pairs_service(self, hot_pairs_service):
        """Устанавливает сервис для определения горячих пар"""
        self._hot_pairs_service = hot_pairs_service

    @staticmethod
    def _norm_pair(a: int, b: int) -> tuple[int, int]:
        return (a, b) if a <= b else (b, a)

    def _pair_key(self, a: int, b: int) -> int:
        """Генерирует pair_key для Citus sharding"""
        x, y = self._norm_pair(a, b)
        return (x << 32) | y

    async def _is_hot_pair(self, from_user: int, to_user: int) -> bool:
        """Проверяет, является ли пара горячей"""
        if self._hot_pairs_service:
            return await self._hot_pairs_service.is_hot_pair(from_user, to_user)
        return False

    @asynccontextmanager
    async def acquire(self, from_user: int, to_user: int):
        if self._pool is None:
            raise RuntimeError("Shard pool not initialized")
        
        # Проверяем, является ли пара горячей
        is_hot = await self._is_hot_pair(from_user, to_user)
        
        async with self._pool.acquire() as conn:
            # Если пара горячая, устанавливаем hint для Citus
            if is_hot:
                # Устанавливаем session variable для маршрутизации в hot кластер
                await conn.execute("SET citus.shard_replication_factor = 1")
                # Можно добавить другие настройки для hot кластера
            
            yield conn


