import asyncpg
from contextlib import asynccontextmanager
from src.helpers.settings import settings
from src.helpers.logger import logger
from .base import RoutingDataSource


class SingleDatabaseRouter(RoutingDataSource):
    """
    Роутер для работы с одной базой данных.
    
    Все запросы (read и write) направляются на одну базу данных.
    Используется когда репликация не настроена или не требуется.
    """
    
    def __init__(self):
        self._pool = None
        self._master_url = settings.DATABASE_URL
        # Для совместимости с tools_service
        self._slave_pools = []

    async def initialize(self):
        # Убираем +asyncpg из URL для прямого использования с asyncpg
        asyncpg_url = self._master_url.replace('postgresql+asyncpg://', 'postgresql://')
        
        self._pool = await asyncpg.create_pool(
            asyncpg_url,
            min_size=5,
            max_size=20,
            server_settings={'application_name': 'otus_hw_single'}
        )
        logger.info(f"🔗 Single database pool created: {asyncpg_url.split('@')[1]}")

    async def close(self):
        if self._pool:
            await self._pool.close()
            logger.info("❌ Single database pool closed")

    @asynccontextmanager
    async def get_connection(self, query=None, force_master=False):
        async with self._pool.acquire() as conn:
            yield conn

    @asynccontextmanager
    async def get_transaction(self):
        async with self._pool.acquire() as conn:
            async with conn.transaction():
                yield conn

    async def get_database_health(self):
        try:
            async with self.get_connection() as conn:
                result = await conn.fetchval("SELECT 1")
                display_url = self._master_url.replace('postgresql+asyncpg://', 'postgresql://').split('@')[1] if '@' in self._master_url else "unknown"
                return {
                    "master": {
                        "status": "healthy" if result == 1 else "unhealthy",
                        "url": display_url
                    }
                }
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            display_url = self._master_url.replace('postgresql+asyncpg://', 'postgresql://').split('@')[1] if '@' in self._master_url else "unknown"
            return {
                "master": {
                    "status": "unhealthy",
                    "url": display_url,
                    "error": str(e)
                }
            } 