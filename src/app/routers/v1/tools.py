from fastapi import APIRouter

from src.service.tools_service import ToolsService
from src.database.connection import health_check

tools_router = APIRouter(prefix="/tools", tags=["Tools"])
tools_service = ToolsService()


@tools_router.post("/generate-users/{count}")
async def generate_users(count: int):
    """Генерирует указанное количество пользователей в базе данных"""
    return await tools_service.generate_users(count)


@tools_router.get("/health/db")
async def database_health():
    """Проверка состояния подключений к master и slave базам данных"""
    health_status = await health_check()
    
    # Общий статус системы
    overall_healthy = all(
        db_status["status"] == "healthy" 
        for db_status in health_status.values()
    )
    
    return {
        "overall_status": "healthy" if overall_healthy else "unhealthy",
        "databases": health_status,
        "details": {
            "master": "Подключение для записи (INSERT, UPDATE, DELETE)",
            "slave": "Подключение для чтения (SELECT) с автоматическим fallback на мастер"
        }
    }