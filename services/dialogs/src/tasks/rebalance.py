import asyncio

from celery import Celery

from src.core.settings import settings
from src.core.logger import logger
from src.infra.db.connection import DbConnection
from src.infra.redis.hot_pairs_provider import HotPairsProvider
from src.services.hot_pairs_rebalance_service import HotPairsRebalanceService

celery_app = Celery("dialogs_rebalance")
celery_app.conf.broker_url = settings.redis_url
celery_app.conf.result_backend = settings.redis_url
celery_app.conf.timezone = "UTC"
celery_app.conf.beat_schedule = {
    "rebalance-hot-pairs": {
        "task": "dialogs.rebalance.hot_pairs",
        "schedule": 300.0,
    }
}
celery_app.conf.task_default_queue = "dialogs_rebalance"

app = celery_app


@celery_app.task(name="dialogs.rebalance.hot_pairs")
def rebalance_hot_pairs() -> None:
    asyncio.run(_rebalance_hot_pairs())


async def _rebalance_hot_pairs() -> None:
    if not settings.hot_worker_nodes:
        logger.error("Hot worker nodes are not configured; skipping rebalance")
        return

    db_connection = DbConnection(dsn=settings.db_master_url)
    hot_pairs_provider = HotPairsProvider(
        redis_url=settings.redis_url,
        window_sec=settings.hot_pair_window_sec,
        promote_threshold=settings.hot_pair_threshold,
        active_ttl_sec=settings.hot_pair_active_ttl_sec,
    )
    rebalancer = HotPairsRebalanceService(
        hot_pairs_provider=hot_pairs_provider,
        db_connection=db_connection,
        hot_worker_nodes=settings.hot_worker_nodes,
    )

    await db_connection.initialize()

    try:
        await rebalancer.rebalance()
    finally:
        await hot_pairs_provider.close()
        await db_connection.close()
