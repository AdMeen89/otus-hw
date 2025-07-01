from sqlalchemy import text
from src.database.connection import read_connection, write_connection, transaction
from sqlalchemy.ext.asyncio import AsyncSession


class UserProvider:
    @write_connection
    async def create(self, data: dict, session: AsyncSession):
        query = """
        INSERT INTO otus_hw.users (first_name, password_hash, last_name, birthday, gender, interests, city) 
        VALUES (:first_name, :password, :last_name, :birthday, :gender, :interests, :city) 
        RETURNING *;
        """
        result = await session.execute(text(query), data)
        return result.fetchone()

    @read_connection
    async def get_by_id(self, user_id: int, session: AsyncSession):
        query = """
        SELECT * FROM otus_hw.users WHERE id = :user_id LIMIT 1;
        """
        result = await session.execute(text(query), {"user_id": user_id})
        return result.fetchone()
    
    @write_connection
    async def delete_all(self, session: AsyncSession):
        query = """
        DELETE FROM otus_hw.users;
        """
        await session.execute(text(query))

    @read_connection
    async def search_by_first_and_last_names(self, first_name: str, last_name: str, session: AsyncSession):
        query = """
        SELECT * FROM otus_hw.users WHERE first_name LIKE :first_name AND last_name LIKE :last_name ORDER BY id ASC;
        """
        result = await session.execute(text(query), {"first_name": f"{first_name}%", "last_name": f"{last_name}%"})
        return result.fetchall()

    @transaction
    async def bulk_create(self, data: list[dict], session: AsyncSession):
        query = """
        INSERT INTO otus_hw.users (first_name, password_hash, last_name, birthday, gender, interests, city) 
        VALUES (:first_name, :password, :last_name, :birthday, :gender, :interests, :city);
        """
        await session.execute(text(query), data)