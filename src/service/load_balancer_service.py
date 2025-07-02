from src.helpers.logger import logger
from src.database.connection import router as db_router
from src.database.routers.replication import ReplicationRoutingDataSource


class LoadBalancerService:
    def __init__(self):
        pass

    def get_stats(self):
        # Проверяем тип роутера
        if isinstance(db_router, ReplicationRoutingDataSource):
            # Статистика для режима репликации
            with db_router._lock:
                total_requests = db_router._master_access_count + sum(db_router._slave_access_counts)
                
                stats = {
                    "total_requests": total_requests,
                    "master": {
                        "requests": db_router._master_access_count,
                        "percentage": round(db_router._master_access_count / max(total_requests, 1) * 100, 2)
                    },
                    "slaves": []
                }
                
                for i, (requests, failures) in enumerate(zip(db_router._slave_access_counts, db_router._slave_failures)):
                    slave_stats = {
                        "index": i + 1,
                        "url": db_router.slave_urls[i],
                        "requests": requests,
                        "failures": failures,
                        "percentage": round(requests / max(total_requests, 1) * 100, 2),
                        "healthy": db_router._slave_pools[i] is not None
                    }
                    stats["slaves"].append(slave_stats)
                
                return stats
        else:
            # Статистика для режима single database
            return {
                "total_requests": 0,
                "master": {
                    "requests": 0,
                    "percentage": 100.0
                },
                "slaves": [],
                "mode": "single_database",
                "note": "Статистика балансировки недоступна в режиме single database"
            }

    def reset_stats(self):
        if isinstance(db_router, ReplicationRoutingDataSource):
            with db_router._lock:
                db_router._master_access_count = 0
                db_router._slave_access_counts = [0] * len(db_router.slave_urls)
                db_router._slave_failures = [0] * len(db_router.slave_urls)
            logger.info("📊 Replication statistics reset")
        else:
            logger.info("📊 Statistics reset (single database mode - no stats to reset)")

    async def test_balancing(self, count: int = 10):
        results = []
        for i in range(count):
            try:
                result = await db_router.fetchval("SELECT 1")
                results.append({"request": i + 1, "status": "success", "result": result})
            except Exception as e:
                results.append({"request": i + 1, "status": "error", "error": str(e)})
        
        stats = self.get_stats()
        
        mode_message = "репликации" if isinstance(db_router, ReplicationRoutingDataSource) else "single database"
        
        return {
            "message": f"Выполнено {count} тестовых read запросов в режиме {mode_message}",
            "test_results": results,
            "updated_stats": stats
        }