import asyncio
import time
from fastapi import APIRouter, Depends, Request

from dialogs_app.security.auth import get_current_user_id
from dialogs_app.repository.dialogs_repository import DialogsRepository
from dialogs_app.db.shard_router import ShardRouter
from dialogs_app.settings import settings
from dialogs_app.models.message import SendMessageRequest, DialogResponse, GenerateMessagesRequest, GenerateMessagesResponse


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


@api_router.get("/dialog/{user_id}/list", response_model=list[DialogResponse])
async def get_dialog(request: Request, user_id: int, current_user_id: int = Depends(get_current_user_id)):
    repo = await get_repo(request)
    results = await repo.get_dialog(current_user_id, user_id)
    return [DialogResponse(**result) for result in results]


@api_router.post("/dialog/{user_id}/send", response_model=DialogResponse)
async def send_dialog(
    request: Request, 
    user_id: int, 
    message_data: SendMessageRequest,
    current_user_id: int = Depends(get_current_user_id)
):
    repo = await get_repo(request)
    result = await repo.upsert_dialog(current_user_id, user_id, last_message=message_data.text)
    return DialogResponse(**result)


@api_router.get("/admin/hot/users")
async def admin_hot_users(request: Request):
    hot_pairs_service = getattr(request.app.state, 'hot_pairs_service', None)
    if not hot_pairs_service:
        return {"users": [], "error": "Hot pairs service not available"}
    
    users = await hot_pairs_service.get_hot_users()
    return {"users": users}


@api_router.post("/admin/hot/promote")
async def admin_hot_promote(user_id: int, request: Request):
    hot_pairs_service = getattr(request.app.state, 'hot_pairs_service', None)
    if not hot_pairs_service:
        return {"user_id": user_id, "hot": False, "error": "Hot pairs service not available"}
    
    success = await hot_pairs_service.promote_user(user_id)
    return {"user_id": user_id, "hot": success}


@api_router.post("/admin/hot/demote")
async def admin_hot_demote(user_id: int, request: Request):
    hot_pairs_service = getattr(request.app.state, 'hot_pairs_service', None)
    if not hot_pairs_service:
        return {"user_id": user_id, "hot": True, "error": "Hot pairs service not available"}
    
    success = await hot_pairs_service.demote_user(user_id)
    return {"user_id": user_id, "hot": not success}


@api_router.post("/tools/messages/create", response_model=GenerateMessagesResponse)
async def tools_generate_messages(
    request: Request,
    message_data: GenerateMessagesRequest
):
    """
    Генерирует тестовые сообщения между пользователями с заданным RPS.
    Полезно для тестирования hot pairs логики.
    """
    repo = await get_repo(request)
    
    start_time = time.time()
    generated = 0
    
    # Вычисляем интервал между сообщениями для достижения нужного RPS
    interval = 1.0 / message_data.rps if message_data.rps > 0 else 0.1
    
    for i in range(message_data.count):
        message_text = f"Тестовое сообщение {i+1} от пользователя {message_data.from_user}"
        
        try:
            await repo.upsert_dialog(
                message_data.from_user, 
                message_data.to_user, 
                last_message=message_text
            )
            generated += 1
            
            # Соблюдаем RPS - ждем нужный интервал
            if i < message_data.count - 1:  # Не ждем после последнего сообщения
                await asyncio.sleep(interval)
                
        except Exception as e:
            print(f"Ошибка при генерации сообщения {i+1}: {e}")
            continue
    
    duration = time.time() - start_time
    
    return GenerateMessagesResponse(
        from_user=message_data.from_user,
        to_user=message_data.to_user,
        generated=generated,
        rps=message_data.rps,
        duration_sec=round(duration, 2)
    )


