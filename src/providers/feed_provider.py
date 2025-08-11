from src.database.connection import router


class FeedProvider:
    async def get_feed(self, user_id: int, limit: int = 20, offset: int = 0) -> list[dict]:
        # Временный fallback: берём из БД посты друзей
        query = """
        SELECT p.*
        FROM otus_hw.posts p
        JOIN otus_hw.users_friends f ON f.friend_id = p.user_id
        WHERE f.user_id = $1
        ORDER BY p.created_at DESC
        LIMIT $2 OFFSET $3;
        """
        async with router.get_connection(query) as conn:
            rows = await conn.fetch(query, user_id, limit, offset)
            return [dict(r) for r in rows]


