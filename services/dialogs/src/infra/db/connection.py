from contextlib import asynccontextmanager

from src.infra.db.citus_router import CitusRoutingDataSource

class DbConnection:
    def __init__(self, dsn: str):
        self._router = CitusRoutingDataSource(dsn=dsn)

    async def initialize(self):
        await self._router.initialize()

    async def close(self):
        await self._router.close()

    @asynccontextmanager
    async def get_connection(self):
        async with self._router.get_connection() as conn:
            yield conn
    
    
