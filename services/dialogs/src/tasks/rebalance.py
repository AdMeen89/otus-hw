import asyncio
from typing import Iterable, Sequence

from celery import Celery

from src.core.settings import settings
from src.core.logger import logger
from src.infra.db.connection import DbConnection
from src.infra.redis.hot_pairs_provider import HotPairsProvider


celery_app = Celery("dialogs_rebalance")
celery_app.conf.broker_url = settings.redis_url
celery_app.conf.result_backend = settings.redis_url
celery_app.conf.timezone = "UTC"
celery_app.conf.beat_schedule = {
    "rebalance-hot-pairs": {
        "task": "dialogs.rebalance.hot_pairs",
        "schedule": 60.0,
    }
}
celery_app.conf.task_default_queue = "dialogs_rebalance"

app = celery_app


@celery_app.task(name="dialogs.rebalance.hot_pairs")
def rebalance_hot_pairs() -> None:
    asyncio.run(_rebalance_hot_pairs())


async def _rebalance_hot_pairs() -> None:
    if not settings.hot_worker_nodes:
        logger.debug("Hot worker nodes are not configured; skipping rebalance")
        return

    hot_pairs_provider = HotPairsProvider(
        redis_url=settings.redis_url,
        window_sec=settings.hot_pair_window_sec,
        promote_threshold=settings.hot_pair_threshold,
        active_ttl_sec=settings.hot_pair_active_ttl_sec,
    )
    db_connection = DbConnection(dsn=settings.db_master_url)

    try:
        await db_connection.initialize()
        hot_pairs = await hot_pairs_provider.get_hot_pairs()
        if not hot_pairs:
            logger.debug("No hot pairs detected; nothing to rebalance")
            return

        async with db_connection.get_connection() as conn:
            for pair_key in hot_pairs:
                try:
                    shard_id = await conn.fetchval(
                        "SELECT get_shard_id_for_distribution_column('otus_hw.dialogs', CAST($1 AS bigint))",
                        pair_key,
                    )
                    if shard_id is None:
                        logger.warning("No shard found for pair %s", pair_key)
                        continue

                    placements = await conn.fetch(
                        """
                        SELECT nodename, nodeport
                        FROM pg_dist_shard_placement
                        WHERE shardid = $1
                        """,
                        shard_id,
                    )
                    if not placements:
                        logger.warning("No placements for shard %s", shard_id)
                        continue

                    current_nodes = [(p["nodename"], p["nodeport"]) for p in placements]
                    if _has_hot_placement(current_nodes, settings.hot_worker_nodes):
                        logger.debug(
                            "Shard %s already located on hot node; skipping", shard_id
                        )
                        continue

                    target = _choose_target(settings.hot_worker_nodes, current_nodes)
                    if target is None:
                        logger.debug(
                            "No available hot node for shard %s; current nodes: %s",
                            shard_id,
                            current_nodes,
                        )
                        continue

                    source = _choose_source(current_nodes, settings.hot_worker_nodes)
                    if source is None:
                        logger.debug(
                            "Unable to determine source for shard %s; nodes: %s",
                            shard_id,
                            current_nodes,
                        )
                        continue
                    logger.info(
                        "Moving shard %s for pair %s from %s:%s to %s:%s",
                        shard_id,
                        pair_key,
                        source[0],
                        source[1],
                        target[0],
                        target[1],
                    )
                    await conn.execute(
                        "SELECT master_move_shard_placement($1, $2, $3, $4, $5)",
                        shard_id,
                        source[0],
                        source[1],
                        target[0],
                        target[1],
                    )
                except Exception as exc:  # noqa: BLE001
                    logger.exception("Failed to rebalance pair %s: %s", pair_key, exc)
    except Exception as exc:  # noqa: BLE001
        logger.exception("Rebalance cycle failed: %s", exc)
    finally:
        await hot_pairs_provider.close()
        await db_connection.close()


def _has_hot_placement(
    placements: Iterable[tuple[str, int]], hot_nodes: Sequence[tuple[str, int]]
) -> bool:
    hot_set = set(hot_nodes)
    return any(node in hot_set for node in placements)


def _choose_target(
    hot_nodes: Sequence[tuple[str, int]], placements: Iterable[tuple[str, int]]
) -> tuple[str, int] | None:
    used = set(placements)
    for node in hot_nodes:
        if node not in used:
            return node
    return None


def _choose_source(
    placements: Iterable[tuple[str, int]], hot_nodes: Sequence[tuple[str, int]]
) -> tuple[str, int] | None:
    hot_set = set(hot_nodes)
    for node in placements:
        if node not in hot_set:
            return node
    return None


__all__ = ["celery_app", "app"]
