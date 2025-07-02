from src.helpers.settings import settings
from src.helpers.logger import logger

# Выбираем роутер в зависимости от настроек
if settings.enable_replication:
    from src.database.replication_router import router
    logger.info("🏗️ Replication mode enabled")
else:
    from src.database.single_router import router
    logger.info("🔗 Single database mode enabled")


async def init_database():
    await router.initialize()
    logger.info("🔄 Database router initialized")


async def close_database():
    await router.close()
    logger.info("❌ Database router closed")


# Экспортируем router для использования в других модулях
__all__ = ['router', 'init_database', 'close_database']
