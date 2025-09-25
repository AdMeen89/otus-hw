from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager

from dialogs_app.http.request_id import request_id_middleware
from dialogs_app.http.routes import api_router
from dialogs_app.db.shard_router import ShardRouter
from dialogs_app.settings import settings
from dialogs_app.repository.dialogs_repository import DialogsRepository


router: ShardRouter | None = None
repo: DialogsRepository | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global router, repo
    # Берём список DSN из настроек (env DIALOG_SHARDS)
    shard_dsns = settings.dialog_shards
    router = ShardRouter(shard_dsns)
    await router.initialize()
    repo = DialogsRepository(router)
    app.state.dialogs_repo = repo
    yield
    await router.close()


def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app.middleware('http')(request_id_middleware)
    app.include_router(api_router, prefix="/api/v1")
    return app


app = create_app()


def run():
    uvicorn.run("dialogs_app.app:app", host="0.0.0.0", port=8081, reload=False)


