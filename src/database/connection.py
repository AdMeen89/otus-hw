from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from functools import wraps
import logging

from src.helpers.settings import app_settings

logger = logging.getLogger(__name__)

print(f"Master DB URL: {app_settings.db_master_url}")
print(f"Slave DB URL: {app_settings.db_slave_url}")

# Настройки пула соединений
POOL_CONFIG = {
    "echo": False,
    "pool_size": 75,         # Уменьшили для каждого движка
    "max_overflow": 175,     # Суммарно 250 на каждый движок
    "pool_timeout": 90,
    "pool_recycle": 1800,
    "pool_pre_ping": True,
    "connect_args": {
        "server_settings": {
            "application_name": "otus_hw_app",
            "jit": "off",
        },
        "command_timeout": 60,
    }
}

# Движок для мастера (запись)
master_engine = create_async_engine(app_settings.db_master_url, **POOL_CONFIG)

# Движок для слейвов (чтение)
slave_engine = create_async_engine(app_settings.db_slave_url, **POOL_CONFIG)

# Сессии
master_session_maker = async_sessionmaker(
    bind=master_engine, 
    expire_on_commit=False,
    autoflush=False,
    autocommit=False
)

slave_session_maker = async_sessionmaker(
    bind=slave_engine, 
    expire_on_commit=False,
    autoflush=False,
    autocommit=False
)

# Обратная совместимость
engine = master_engine
async_session_maker = master_session_maker


def write_connection(method):
    """Декоратор для операций записи (INSERT, UPDATE, DELETE) - использует мастер"""
    @wraps(method)
    async def wrapper(*args, **kwargs):
        async with master_session_maker() as session:
            try:
                result = await method(*args, session=session, **kwargs)
                await session.commit()
                return result
            except Exception as e:
                await session.rollback()
                logger.error(f"Write operation failed: {e}")
                raise e
            finally:
                await session.close()
    return wrapper


def read_connection(method):
    """Декоратор для операций чтения (SELECT) - использует слейвы"""
    @wraps(method)
    async def wrapper(*args, **kwargs):
        async with slave_session_maker() as session:
            try:
                return await method(*args, session=session, **kwargs)
            except Exception as e:
                # При ошибке на слейве пробуем мастер
                logger.warning(f"Read from slave failed, trying master: {e}")
                async with master_session_maker() as master_session:
                    try:
                        return await method(*args, session=master_session, **kwargs)
                    except Exception as master_e:
                        logger.error(f"Read from master also failed: {master_e}")
                        raise master_e
                    finally:
                        await master_session.close()
            finally:
                await session.close()
    return wrapper


def connection(method):
    """Универсальный декоратор (обратная совместимость) - использует мастер"""
    @wraps(method)
    async def wrapper(*args, **kwargs):
        async with master_session_maker() as session:
            try:
                return await method(*args, session=session, **kwargs)
            except Exception as e:
                await session.rollback()
                logger.error(f"Database operation failed: {e}")
                raise e
            finally:
                await session.close()
    return wrapper


def transaction(method):
    """Декоратор для транзакций - всегда использует мастер"""
    @wraps(method)
    async def wrapper(*args, **kwargs):
        async with master_session_maker() as session:
            try:
                result = await method(*args, session=session, **kwargs)
                await session.commit()
                return result
            except Exception as e:
                await session.rollback()
                logger.error(f"Transaction failed: {e}")
                raise e
            finally:
                await session.close()
    return wrapper


# Утилитарные функции
async def get_master_session():
    """Получить сессию мастера для прямого использования"""
    return master_session_maker()


async def get_slave_session():
    """Получить сессию слейва для прямого использования"""
    return slave_session_maker()


async def health_check():
    """Проверка здоровья подключений к БД"""
    health_status = {
        "master": {"status": "unknown", "error": None},
        "slave": {"status": "unknown", "error": None}
    }
    
    # Проверка мастера
    try:
        async with master_session_maker() as session:
            from sqlalchemy import text
            await session.execute(text("SELECT 1"))
            health_status["master"]["status"] = "healthy"
    except Exception as e:
        health_status["master"]["status"] = "unhealthy"
        health_status["master"]["error"] = str(e)
    
    # Проверка слейва
    try:
        async with slave_session_maker() as session:
            from sqlalchemy import text
            await session.execute(text("SELECT 1"))
            health_status["slave"]["status"] = "healthy"
    except Exception as e:
        health_status["slave"]["status"] = "unhealthy"
        health_status["slave"]["error"] = str(e)
    
    return health_status
