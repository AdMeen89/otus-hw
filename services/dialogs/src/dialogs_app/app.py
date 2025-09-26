from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager

from dialogs_app.http.request_id import request_id_middleware
from dialogs_app.http.routes import api_router
from dialogs_app.db.shard_router import ShardRouter
from dialogs_app.settings import settings
from dialogs_app.repository.dialogs_repository import DialogsRepository
from dialogs_app.service.hot_pairs_service import HotPairsService


router: ShardRouter | None = None
repo: DialogsRepository | None = None
hot_pairs_service: HotPairsService | None = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global router, repo, hot_pairs_service
    # Инициализируем HotPairsService
    hot_pairs_service = HotPairsService()
    await hot_pairs_service.initialize()
    
    # Берём список DSN из настроек (env DIALOG_SHARDS)
    shard_dsns = settings.dialog_shards
    router = ShardRouter(shard_dsns)
    await router.initialize()
    
    # Связываем router с hot_pairs_service
    router.set_hot_pairs_service(hot_pairs_service)
    
    repo = DialogsRepository(router, hot_pairs_service)
    app.state.dialogs_repo = repo
    app.state.hot_pairs_service = hot_pairs_service
    
    yield
    
    await hot_pairs_service.close()
    await router.close()


def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    app.middleware('http')(request_id_middleware)
    app.include_router(api_router, prefix="/api/v1")
    return app


app = create_app()


def run():
    uvicorn.run("dialogs_app.app:app", host="0.0.0.0", port=8081, reload=False)


