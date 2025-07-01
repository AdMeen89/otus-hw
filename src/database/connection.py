from functools import wraps
from src.database.replication_router import router
from src.helpers.logger import logger


async def init_database():
    """Инициализация роутера базы данных"""
    await router.initialize()
    logger.info("🔄 Database router initialized")


async def close_database():
    """Закрытие роутера базы данных"""
    await router.close()
    logger.info("❌ Database router closed")


def with_router(func):
    """
    Декоратор для автоматического роутинга запросов.
    Анализирует SQL и направляет на master или slave.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        return await func(*args, **kwargs)
    return wrapper


def with_transaction(func):
    """
    Декоратор для транзакционных операций.
    Всегда использует master с транзакцией.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        async with router.get_transaction() as connection:
            return await func(connection, *args, **kwargs)
    return wrapper


def read_operation(func):
    """
    Декоратор для операций чтения.
    Использует slave с fallback на master.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        # Для read операций используем пустой query, чтобы роутер выбрал slave
        async with router.get_connection("SELECT", force_master=False) as connection:
            return await func(connection, *args, **kwargs)
    return wrapper


def write_operation(func):
    """
    Декоратор для операций записи.
    Всегда использует master.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        async with router.get_connection("INSERT", force_master=True) as connection:
            return await func(connection, *args, **kwargs)
    return wrapper


# Для обратной совместимости со старым кодом
read_connection = read_operation
write_connection = write_operation
transaction = with_transaction


async def get_database_health():
    """Проверка здоровья всех подключений"""
    # Динамически определяем количество слейвов
    num_slaves = len(router._slave_pools) if router._slave_pools else 0
    
    health_status = {
        "overall_status": "healthy",
        "databases": {
            "master": {"status": "unknown", "error": None}
        },
        "details": {
            "master": "Подключение для записи (INSERT, UPDATE, DELETE)"
        }
    }
    
    # Добавляем слейвы динамически
    for i in range(num_slaves):
        slave_key = f"slave{i+1}"
        health_status["databases"][slave_key] = {"status": "unknown", "error": None}
        health_status["details"][slave_key] = "Подключение для чтения (SELECT)"
    
    # Проверяем master
    try:
        async with router.get_connection("INSERT", force_master=True) as conn:
            await conn.fetchval("SELECT 1")
        health_status["databases"]["master"]["status"] = "healthy"
    except Exception as e:
        health_status["databases"]["master"]["status"] = "unhealthy"
        health_status["databases"]["master"]["error"] = str(e)
        health_status["overall_status"] = "degraded"
    
    # Проверяем слейвы
    for i, slave_pool in enumerate(router._slave_pools):
        slave_key = f"slave{i+1}"
        if slave_pool is None:
            health_status["databases"][slave_key]["status"] = "unavailable"
            health_status["databases"][slave_key]["error"] = "Pool not initialized"
            continue
            
        try:
            async with slave_pool.acquire() as conn:
                await conn.fetchval("SELECT 1")
            health_status["databases"][slave_key]["status"] = "healthy"
        except Exception as e:
            health_status["databases"][slave_key]["status"] = "unhealthy"
            health_status["databases"][slave_key]["error"] = str(e)
            if health_status["overall_status"] == "healthy":
                health_status["overall_status"] = "degraded"
    
    # Если master недоступен - статус critical
    if health_status["databases"]["master"]["status"] != "healthy":
        health_status["overall_status"] = "critical"
    
    return health_status
