from fastapi import APIRouter
from src.api.routes.dialog_router import dialog_router
from src.api.routes.tools_router import tools_router

v1_router = APIRouter(prefix="/v1")

v1_router.include_router(dialog_router)
v1_router.include_router(tools_router)