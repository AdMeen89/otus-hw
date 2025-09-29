from contextlib import asynccontextmanager
from typing import Optional
import asyncpg


class CitusRoutingDataSource:
    def __init__(
        self,
        dsn: str,
        *,
        min_size: int = 1,
        max_size: int = 20,
        command_timeout: int = 60,
    ) -> None:
        if not dsn:
            raise ValueError("Citus DSN is empty")
        self._dsn = self._normalise_dsn(dsn)
        self._min_size = min_size
        self._max_size = max_size
        self._command_timeout = command_timeout
        self._pool: Optional[asyncpg.Pool] = None

    async def initialize(self) -> None:
        if self._pool is not None:
            return
        self._pool = await asyncpg.create_pool(
            self._dsn,
            min_size=self._min_size,
            max_size=self._max_size,
            command_timeout=self._command_timeout,
        )

    async def close(self) -> None:
        if self._pool is None:
            return
        await self._pool.close()
        self._pool = None

    @asynccontextmanager
    async def get_connection(self, query: str = "", force_master: bool = False):  # noqa: D401 - тип сигнатуры из базового класса
        if self._pool is None:
            raise RuntimeError("Citus pool not initialised")
        async with self._pool.acquire() as connection:
            yield connection

    @asynccontextmanager
    async def get_transaction(self):  # noqa: D401 - тип сигнатуры из базового класса
        if self._pool is None:
            raise RuntimeError("Citus pool not initialised")
        async with self._pool.acquire() as connection:
            async with connection.transaction():
                yield connection

    @staticmethod
    def _normalise_dsn(dsn: str) -> str:
        if dsn.startswith("postgresql+asyncpg://"):
            return dsn.replace("postgresql+asyncpg://", "postgresql://", 1)
        return dsn
