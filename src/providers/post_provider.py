from src.database.connection import router


class PostProvider:
    async def create(self, user_id: int, text: str) -> dict:
        query = """
        INSERT INTO otus_hw.posts (user_id, text)
        VALUES ($1, $2)
        RETURNING *;
        """
        async with router.get_connection(query, force_master=True) as conn:
            return await conn.fetchrow(query, user_id, text)

    async def bulk_create_for_user(self, user_id: int, texts: list[str]) -> list[dict]:
        """Быстрая вставка нескольких постов одного пользователя за один запрос."""
        if not texts:
            return []
        query = """
        INSERT INTO otus_hw.posts (user_id, text)
        SELECT $1, x FROM unnest($2::text[]) AS t(x)
        RETURNING *;
        """
        async with router.get_connection(query, force_master=True) as conn:
            rows = await conn.fetch(query, user_id, texts)
            return [dict(r) for r in rows]

    async def bulk_create_many(self, user_ids: list[int], texts: list[str]) -> list[dict]:
        """Быстрая вставка пар (user_id, text) за один запрос через UNNEST.
        Ожидается, что длины массивов совпадают.
        """
        if not user_ids or not texts:
            return []
        query = """
        INSERT INTO otus_hw.posts (user_id, text)
        SELECT uid, txt
        FROM unnest($1::int[], $2::text[]) AS t(uid, txt)
        RETURNING *;
        """
        async with router.get_connection(query, force_master=True) as conn:
            rows = await conn.fetch(query, user_ids, texts)
            return [dict(r) for r in rows]

    async def update(self, user_id: int, text: str) -> dict:
        query = """
        UPDATE otus_hw.posts
        SET text = $2
        WHERE id = $1
        RETURNING *;
        """
        async with router.get_connection(query, force_master=True) as conn:
            return await conn.fetchrow(query, user_id, text)
        
    async def delete(self, user_id: int, post_id: int) -> None:
        query = """
        DELETE FROM otus_hw.posts
        WHERE id = $1 AND user_id = $2;
        """
        async with router.get_connection(query, force_master=True) as conn:
            await conn.execute(query, post_id, user_id)

    async def get(self, post_id: int) -> dict:
        query = """
        SELECT * FROM otus_hw.posts
        WHERE id = $1;
        """
        async with router.get_connection(query, force_master=False) as conn:
            return await conn.fetchrow(query, post_id)