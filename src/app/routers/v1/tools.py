from fastapi import APIRouter

from src.service.tools_service import ToolsService

tools_router = APIRouter(prefix="/tools", tags=["Tools"])
tools_service = ToolsService()


@tools_router.post("/generate-users/{count}")
async def generate_users(count: int):
    """Генерирует указанное количество пользователей в базе данных"""
    return await tools_service.generate_users(count) 