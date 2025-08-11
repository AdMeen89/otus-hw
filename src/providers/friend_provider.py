from src.database.connection import router


class FriendProvider:
    async def create(self, user_id: int, friend_id: int):
        query = """
        INSERT INTO otus_hw.users_friends (user_id, friend_id)
        VALUES ($1, $2);
        """
        async with router.get_connection(query, force_master=True) as conn:
            await conn.execute(query, user_id, friend_id)

    async def get_by_user_id(self, user_id: int, force_master: bool = False):
        query = """
        SELECT * FROM otus_hw.users_friends WHERE user_id = $1;
        """
        async with router.get_connection(query, force_master=force_master) as conn:
            return await conn.fetch(query, user_id)

    async def delete_by_user_id_and_friend_id(self, user_id: int, friend_id: int):
        query = """
        DELETE FROM otus_hw.users_friends WHERE user_id = $1 AND friend_id = $2;
        """
        async with router.get_connection(query, force_master=True) as conn:
            await conn.execute(query, user_id, friend_id)
