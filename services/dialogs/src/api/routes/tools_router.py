from fastapi import APIRouter, Depends
from src.api.deps.deps import get_dialogs_service
from src.services.dialogs_service import DialogsService 

tools_router = APIRouter(prefix="/tools", tags=["Tools"])

@tools_router.get("/hot/pairs")
async def get_hot_users(dialogs_service: DialogsService = Depends(get_dialogs_service)):
    return {"pairs": await dialogs_service.get_hot_users()}