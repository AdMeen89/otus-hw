from fastapi import FastAPI
from contextlib import asynccontextmanager
from src.api.routes.v1 import v1_router
from src.core.settings import settings
from src.services.dialogs_service import DialogsService
from src.infra.db.connection import DbConnection
from src.infra.db.dialogs_provider import DialogsProvider

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.settings = settings
    app.state.db_connection = DbConnection(dsn=settings.db_master_url)
    app.state.dialogs_provider = DialogsProvider(db_connection=app.state.db_connection)
    app.state.dialogs_service = DialogsService(dialogs_provider=app.state.dialogs_provider)
    await app.state.db_connection.initialize()
    yield
    await app.state.db_connection.close()

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app.include_router(v1_router)
    return app


app = create_app()
