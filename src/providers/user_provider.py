from sqlalchemy import text
from src.database.connection import connection
from sqlalchemy.ext.asyncio import AsyncSession


class UserProvider:
    @connection
    async def create(self, data: dict, session: AsyncSession):
        query = """
        INSERT INTO otus_hw.users (first_name, password_hash, last_name, birthday, gender, interests, city) 
        VALUES (:first_name, :password, :last_name, :birthday, :gender, :interests, :city) 
        RETURNING *;
        """
        result = await session.execute(text(query), data)
        await session.commit()
        return result.fetchone()

    @connection
    async def get_by_id(self, user_id: int, session: AsyncSession):
        query = """
        SELECT * FROM otus_hw.users WHERE id = :user_id LIMIT 1;
        """
        result = await session.execute(text(query), {"user_id": user_id})
        return result.fetchone()
