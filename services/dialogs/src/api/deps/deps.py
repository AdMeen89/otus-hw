from collections.abc import AsyncIterator

from fastapi import Request

from src.core.settings import Settings, settings as default_settings
from src.services.dialogs_service import DialogsService
from src.services.hot_pairs_rebalance_service import HotPairsRebalanceService
from src.infra.db.connection import DbConnection
from src.infra.redis.hot_pairs_provider import HotPairsProvider

async def get_settings(request: Request) -> Settings:
    return getattr(request.app.state, 'settings', default_settings)

async def get_dialogs_service(request: Request) -> DialogsService:
    return request.app.state.dialogs_service


async def get_rebalance_service(request: Request) -> AsyncIterator[HotPairsRebalanceService]:
    settings = await get_settings(request)

    db_connection = DbConnection(dsn=settings.db_master_url)
    hot_pairs_provider = HotPairsProvider(
        redis_url=settings.redis_url,
        window_sec=settings.hot_pair_window_sec,
        promote_threshold=settings.hot_pair_threshold,
        active_ttl_sec=settings.hot_pair_active_ttl_sec,
    )

    await db_connection.initialize()

    service = HotPairsRebalanceService(
        hot_pairs_provider=hot_pairs_provider,
        db_connection=db_connection,
        hot_worker_nodes=settings.hot_worker_nodes,
    )

    try:
        yield service
    finally:
        await hot_pairs_provider.close()
        await db_connection.close()
