from src.database.replication_router import router


class UserProvider:
    
    async def create(self, data: dict):
        """Создание пользователя (используется master)"""
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
        """Получение пользователя по ID (используется slave)"""
        query = """
        SELECT * FROM otus_hw.users WHERE id = $1 LIMIT 1;
        """
        async with router.get_connection(query) as conn:
            return await conn.fetchrow(query, user_id)
    
    async def delete_all(self):
        """Удаление всех пользователей (используется master)"""
        query = """
        DELETE FROM otus_hw.users;
        """
        async with router.get_connection(query, force_master=True) as conn:
            await conn.execute(query)

    async def search_by_first_and_last_names(self, first_name: str, last_name: str):
        """Поиск пользователей по имени и фамилии (используется slave)"""
        query = """
        SELECT * FROM otus_hw.users WHERE first_name LIKE $1 AND last_name LIKE $2 ORDER BY id ASC;
        """
        async with router.get_connection(query) as conn:
            return await conn.fetch(query, f"{first_name}%", f"{last_name}%")

    async def bulk_create(self, data: list[dict]):
        """Массовое создание пользователей в транзакции (используется master)"""
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