import asyncpg


class CitusProvider:
    @staticmethod
    async def get_shard_id(conn: asyncpg.Connection, pair_key: int) -> int | None:
        return await conn.fetchval(
            "SELECT get_shard_id_for_distribution_column('otus_hw.dialogs', CAST($1 AS bigint))",
            pair_key,
        )

    @staticmethod
    async def get_placements(
        conn: asyncpg.Connection, shard_id: int
    ) -> list[asyncpg.Record]:
        return await conn.fetch(
            """
            SELECT shardid, nodename, nodeport
            FROM pg_dist_shard_placement
            WHERE shardid = $1
            """,
            shard_id,
        )

    @staticmethod
    async def get_all_placements(conn: asyncpg.Connection) -> list[asyncpg.Record]:
        return await conn.fetch(
            "SELECT shardid, nodename, nodeport FROM pg_dist_shard_placement"
        )

    @staticmethod
    async def list_nodes(conn: asyncpg.Connection) -> list[asyncpg.Record]:
        return await conn.fetch(
            "SELECT nodename, nodeport FROM pg_dist_node"
        )

    @staticmethod
    async def move_shard(
        conn: asyncpg.Connection,
        shard_id: int,
        source: tuple[str, int],
        target: tuple[str, int],
    ) -> None:
        await conn.execute(
            "SELECT master_move_shard_placement($1, $2, $3, $4, $5)",
            shard_id,
            source[0],
            source[1],
            target[0],
            target[1],
        )
