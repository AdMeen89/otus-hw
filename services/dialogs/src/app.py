from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.api.routes.v1 import v1_router
from src.core.settings import settings
from src.services.dialogs_service import DialogsService
from src.infra.db.connection import DbConnection
from src.infra.db.dialogs_provider import DialogsProvider
from src.infra.redis.hot_pairs_provider import HotPairsProvider

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.settings = settings
    app.state.db_connection = DbConnection(dsn=settings.db_master_url)
    app.state.dialogs_provider = DialogsProvider(db_connection=app.state.db_connection)
    app.state.hot_pairs_provider = HotPairsProvider(
        redis_url=settings.redis_url,
        window_sec=settings.hot_pair_window_sec,
        promote_threshold=settings.hot_pair_threshold,
        active_ttl_sec=settings.hot_pair_active_ttl_sec,
    )
    app.state.dialogs_service = DialogsService(
        dialogs_provider=app.state.dialogs_provider,
        hot_pairs_provider=app.state.hot_pairs_provider,
    )
    await app.state.db_connection.initialize()
    yield
    await app.state.hot_pairs_provider.close()
    await app.state.db_connection.close()

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app.include_router(v1_router)
    return app


app = create_app()
