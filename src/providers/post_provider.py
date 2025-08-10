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