from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from src.helpers.settings import app_settings

print(app_settings.db_url)

engine = create_async_engine(app_settings.db_url, echo=False)
async_session_maker = async_sessionmaker(bind=engine, expire_on_commit=False)


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
