from fastapi import APIRouter
from src.service.load_balancer_service import LoadBalancerService

router = APIRouter(tags=["load-balancer"])
load_balancer_service = LoadBalancerService()


@router.get("/stats")
async def get_load_balancing_stats():
    stats = load_balancer_service.get_stats()
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


@router.post("/reset-stats")
async def reset_load_balancing_stats():
    load_balancer_service.reset_stats()
    return {
        "message": "Статистика балансировки сброшена",
        "status": "success"
    }


@router.post("/test/{count}")
async def test_load_balancing(count: int):
    result = await load_balancer_service.test_balancing(count)
    return result 