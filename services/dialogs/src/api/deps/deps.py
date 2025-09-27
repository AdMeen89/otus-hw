from fastapi import Request
from src.core.settings import Settings, settings as default_settings
from src.services.dialogs_service import DialogsService

async def get_settings(request: Request) -> Settings:
    return getattr(request.app.state, 'settings', default_settings)

async def get_dialogs_service(request: Request) -> DialogsService:
    return request.app.state.dialogs_service