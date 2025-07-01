from fastapi import APIRouter

from src.service.tools_service import ToolsService
from src.database.replication_router import router as db_router

tools_router = APIRouter(prefix="/tools", tags=["Tools"])
tools_service = ToolsService()


@tools_router.post("/generate-users/{count}")
async def generate_users(count: int):
    """Генерирует указанное количество пользователей в базе данных"""
    return await tools_service.generate_users(count)


@tools_router.get("/health/db")
async def database_health():
    """Проверка состояния подключений к master и slave базам данных"""
    return await tools_service.get_database_health()


@tools_router.get("/load-balancing/stats")
async def load_balancing_stats():
    """Статистика балансировки нагрузки между master и slave серверами"""
    stats = db_router.get_stats()
    return {
        "message": "Статистика балансировки нагрузки",
        "data": stats,
        "description": {
            "total_requests": "Общее количество запросов",
            "master": "Статистика обращений к master серверу",
            "slaves": "Статистика обращений к каждому slave серверу",
            "percentage": "Процент от общего количества запросов",
            "failures": "Количество неудачных попыток подключения",
            "healthy": "Состояние health check пула соединений"
        }
    }


@tools_router.post("/load-balancing/reset-stats")
async def reset_load_balancing_stats():
    """Сброс статистики балансировки нагрузки"""
    db_router.reset_stats()
    return {
        "message": "Статистика балансировки сброшена",
        "status": "success"
    }


@tools_router.post("/load-balancing/test/{count}")
async def test_load_balancing(count: int = 10):
    """Тестирует балансировку нагрузки выполнением указанного количества read запросов"""
    import asyncio
    
    results = []
    for i in range(count):
        try:
            # Выполняем простой SELECT запрос для тестирования балансировки
            result = await db_router.fetchval("SELECT 1")
            results.append({"request": i + 1, "status": "success", "result": result})
        except Exception as e:
            results.append({"request": i + 1, "status": "error", "error": str(e)})
    
    # Получаем обновленную статистику
    stats = db_router.get_stats()
    
    return {
        "message": f"Выполнено {count} тестовых read запросов",
        "test_results": results,
        "updated_stats": stats
    }