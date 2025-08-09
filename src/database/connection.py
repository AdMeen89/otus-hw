from src.helpers.settings import settings
from src.helpers.logger import logger
from src.database.routers import RoutingDataSource, ReplicationRoutingDataSource, SingleDatabaseRouter


def create_router() -> RoutingDataSource:
    """
    Создает экземпляр роутера базы данных на основе конфигурации.
    
    Returns:
        RoutingDataSource: Экземпляр роутера (ReplicationRoutingDataSource или SingleDatabaseRouter)
    """
    if settings.enable_replication:
        logger.info("🏗️ Creating replication router")
        return ReplicationRoutingDataSource()
    else:
        logger.info("🔗 Creating single database router")
        return SingleDatabaseRouter()


# Создаем глобальный экземпляр роутера
router: RoutingDataSource = create_router()


async def init_database():
    """Инициализирует роутер базы данных."""
    await router.initialize()
    logger.info("🔄 Database router initialized")


async def close_database():
    """Закрывает роутер базы данных."""
    await router.close()
    logger.info("❌ Database router closed")


# Экспортируем router для использования в других модулях
__all__ = ['router', 'init_database', 'close_database']
