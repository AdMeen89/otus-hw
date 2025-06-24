from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from src.helpers.settings import app_settings

print(app_settings.db_url)

# Сбалансированные настройки пула соединений для 1000 потоков
engine = create_async_engine(
    app_settings.db_url, 
    echo=False,
    # Сбалансированный пул соединений
    pool_size=150,       # Базовое количество соединений в пуле
    max_overflow=350,    # Дополнительные соединения при нагрузке (итого 500)
    pool_timeout=90,     # Таймаут ожидания соединения
    pool_recycle=1800,   # Переподключение каждые 30 минут
    pool_pre_ping=True,  # Проверка соединения перед использованием
    # Настройки для PostgreSQL
    connect_args={
        "server_settings": {
            "application_name": "otus_hw_app",
            "jit": "off",  # Отключаем JIT для стабильности
        },
        "command_timeout": 60,
    }
)

async_session_maker = async_sessionmaker(
    bind=engine, 
    expire_on_commit=False,
    # Оптимизации для сессий
    autoflush=False,  # Не флашить автоматически
    autocommit=False
)


def connection(method):
    async def wrapper(*args, **kwargs):
        async with async_session_maker() as session:
            try:
                return await method(*args, session=session, **kwargs)
            except Exception as e:
                await session.rollback()
                raise e
            finally:
                await session.close()

    return wrapper
