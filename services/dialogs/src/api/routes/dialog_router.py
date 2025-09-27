from fastapi import APIRouter, Depends
from src.api.deps.security.get_current_user_id import get_current_user_id
from src.api.deps.deps import get_dialogs_service
from src.services.dialogs_service import DialogsService
from src.api.schemas.dialogs import DialogResponse, SendMessageRequest

dialog_router = APIRouter(prefix="/dialog", tags=["Dialogs"])


@dialog_router.get("{user_id}/list")
async def get_dialog_list(
    user_id: int,
    current_user_id: int = Depends(get_current_user_id),
    dialogs_service: DialogsService = Depends(get_dialogs_service),
) -> list[DialogResponse]:
    return await dialogs_service.get_dialog_list(current_user_id=current_user_id, user_id=user_id)


@dialog_router.post("/{user_id}/send")
async def send_dialog_message(
    user_id: int,
    body: SendMessageRequest,
    current_user_id: int = Depends(get_current_user_id),
    dialogs_service: DialogsService = Depends(get_dialogs_service),
) -> DialogResponse:
    return await dialogs_service.send_dialog_message(current_user_id=current_user_id, user_id=user_id, message=body.message)
