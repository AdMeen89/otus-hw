from src.helpers.logger import logger
from src.database.replication_router import router as db_router


class LoadBalancerService:
    def __init__(self):
        pass

    def get_stats(self):
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

    def reset_stats(self):
        with db_router._lock:
            db_router._master_access_count = 0
            db_router._slave_access_counts = [0] * len(db_router.slave_urls)
            db_router._slave_failures = [0] * len(db_router.slave_urls)
        logger.info("📊 Statistics reset")

    async def test_balancing(self, count: int = 10):
        results = []
        for i in range(count):
            try:
                result = await db_router.fetchval("SELECT 1")
                results.append({"request": i + 1, "status": "success", "result": result})
            except Exception as e:
                results.append({"request": i + 1, "status": "error", "error": str(e)})
        
        stats = self.get_stats()
        
        return {
            "message": f"Выполнено {count} тестовых read запросов",
            "test_results": results,
            "updated_stats": stats
        }