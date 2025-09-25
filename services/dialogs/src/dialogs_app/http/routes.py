from fastapi import APIRouter, Depends, Request

from dialogs_app.security.auth import get_current_user_id
from dialogs_app.repository.dialogs_repository import DialogsRepository
from dialogs_app.db.shard_router import ShardRouter
from dialogs_app.settings import settings


api_router = APIRouter()


@api_router.get("/health")
async def health():
    return {"status": "ok"}


async def get_repo(request: Request) -> DialogsRepository:
    repo: DialogsRepository | None = getattr(request.app.state, 'dialogs_repo', None)
    if repo is None:
        # Ленивое создание при первом запросе (на случай, если lifespan ещё не успел)
        router = ShardRouter(settings.dialog_shards)
        await router.initialize()
        repo = DialogsRepository(router)
        request.app.state.dialogs_repo = repo
    return repo


@api_router.get("/dialog/{user_id}/list")
async def get_dialog(request: Request, user_id: int, current_user_id: int = Depends(get_current_user_id)):
    repo = await get_repo(request)
    return await repo.get_dialog(current_user_id, user_id)


@api_router.post("/dialog/{user_id}/send")
async def send_dialog(request: Request, user_id: int, current_user_id: int = Depends(get_current_user_id)):
    repo = await get_repo(request)
    return await repo.upsert_dialog(current_user_id, user_id, last_message="")


@api_router.get("/admin/hot/users")
async def admin_hot_users():
    return {"users": []}


@api_router.post("/admin/hot/promote")
async def admin_hot_promote(user_id: int):
    return {"user_id": user_id, "hot": True}


@api_router.post("/admin/hot/demote")
async def admin_hot_demote(user_id: int):
    return {"user_id": user_id, "hot": False}


@api_router.post("/tools/messages/create")
async def tools_generate_messages(from_user: int, to_user: int, count: int = 100, rps: int = 50):
    return {"from_user": from_user, "to_user": to_user, "generated": count, "rps": rps}


