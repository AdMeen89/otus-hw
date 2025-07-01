from src.database.replication_router import router
from src.helpers.logger import logger


async def init_database():
    await router.initialize()
    logger.info("🔄 Database router initialized")


async def close_database():
    await router.close()
    logger.info("❌ Database router closed")
