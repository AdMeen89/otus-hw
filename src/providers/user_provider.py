from src.database.connection import router


class UserProvider:
    async def create(self, data: dict):
        query = """
        INSERT INTO otus_hw.users (first_name, password_hash, last_name, birthday, gender, interests, city) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *;
        """
        async with router.get_connection(query, force_master=True) as conn:
            return await conn.fetchrow(
                query,
                data["first_name"],
                data["password"],
                data["last_name"],
                data["birthday"],
                data["gender"],
                data["interests"],
                data["city"]
            )

    async def get_by_id(self, user_id: int):
        query = """
        SELECT * FROM otus_hw.users WHERE id = $1 LIMIT 1;
        """
        async with router.get_connection(query) as conn:
            return await conn.fetchrow(query, user_id)
    
    async def delete_all(self):
        queries = [
            "DELETE FROM otus_hw.users;",
            "ALTER SEQUENCE otus_hw.users_id_seq RESTART WITH 1;"
        ]
        async with router.get_connection("DELETE", force_master=True) as conn:
            for query in queries:
                await conn.execute(query)

    async def search_by_first_and_last_names(self, first_name: str, last_name: str):
        query = """
        SELECT * FROM otus_hw.users WHERE first_name LIKE $1 AND last_name LIKE $2 ORDER BY id ASC;
        """
        async with router.get_connection(query) as conn:
            return await conn.fetch(query, f"{first_name}%", f"{last_name}%")

    async def bulk_create(self, data: list[dict]):
        query = """
        INSERT INTO otus_hw.users (first_name, password_hash, last_name, birthday, gender, interests, city) 
        VALUES ($1, $2, $3, $4, $5, $6, $7);
        """
        async with router.get_transaction() as conn:
            for user_data in data:
                await conn.execute(
                    query,
                    user_data["first_name"],
                    user_data["password"],
                    user_data["last_name"],
                    user_data["birthday"],
                    user_data["gender"],
                    user_data["interests"],
                    user_data["city"]
                )