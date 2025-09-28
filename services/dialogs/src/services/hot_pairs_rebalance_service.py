from src.infra.redis.hot_pairs_provider import HotPairsProvider
from src.infra.db.connection import DbConnection
from typing import Sequence, Iterable
from src.core.logger import logger
from src.infra.citus.citus_provider import CitusProvider


class HotPairsRebalanceService:
    def __init__(
        self,
        *,
        hot_pairs_provider: HotPairsProvider,
        db_connection: DbConnection,
        hot_worker_nodes: Sequence[tuple[str, int]],
    ) -> None:
        self._hot_pairs_provider = hot_pairs_provider
        self._db_connection = db_connection
        self._hot_worker_nodes = list(hot_worker_nodes)

    async def rebalance_pair(self, pair_key: int) -> None:
        try:
            async with self._db_connection.get_connection() as conn:
                await self._rebalance_pair(conn, pair_key)
        except Exception as exc:
            logger.exception("Failed to rebalance pair %s: %s", pair_key, exc)

    async def rebalance(self) -> None:
        try:
            hot_pairs = await self._hot_pairs_provider.get_hot_pairs()
            if not hot_pairs:
                logger.debug("No hot pairs detected; nothing to rebalance")
                return

            async with self._db_connection.get_connection() as conn:
                for pair_key in hot_pairs:
                    await self._rebalance_pair(conn, pair_key)
        except Exception as exc:
            logger.exception("Rebalance cycle failed: %s", exc)

    async def _rebalance_pair(self, conn, pair_key: int) -> None:
        try:
            shard_id = await CitusProvider.get_shard_id(conn, pair_key)
            if shard_id is None:
                logger.warning("No shard found for pair %s", pair_key)
                return

            placements = await CitusProvider.get_placements(conn, shard_id)
            if not placements:
                logger.warning("No placements for shard %s", shard_id)
                return

            current_nodes = [(p["nodename"], p["nodeport"]) for p in placements]
            if self._has_hot_placement(current_nodes):
                logger.debug("Shard %s already located on hot node; skipping", shard_id)
                return

            target = self._choose_target(current_nodes)
            if target is None:
                logger.debug(
                    "No available hot node for shard %s; current nodes: %s",
                    shard_id,
                    current_nodes,
                )
                return

            source = self._choose_source(current_nodes)
            if source is None:
                logger.debug(
                    "Unable to determine source for shard %s; nodes: %s",
                    shard_id,
                    current_nodes,
                )
                return

            logger.info(
                "Moving shard %s for pair %s from %s:%s to %s:%s",
                shard_id,
                pair_key,
                source[0],
                source[1],
                target[0],
                target[1],
            )
            await CitusProvider.move_shard(conn, shard_id, source, target)

        except Exception as exc:
            logger.exception("Failed to rebalance pair %s: %s", pair_key, exc)

    def _has_hot_placement(self, placements: Iterable[tuple[str, int]]) -> bool:
        hot_set = set(self._hot_worker_nodes)
        return any(node in hot_set for node in placements)

    def _choose_target(
        self, placements: Iterable[tuple[str, int]]
    ) -> tuple[str, int] | None:
        used = set(placements)
        for node in self._hot_worker_nodes:
            if node not in used:
                return node
        return None

    def _choose_source(
        self, placements: Iterable[tuple[str, int]]
    ) -> tuple[str, int] | None:
        hot_set = set(self._hot_worker_nodes)
        for node in placements:
            if node not in hot_set:
                return node
        return None
