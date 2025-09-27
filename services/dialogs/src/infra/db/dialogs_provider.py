from src.infra.db.connection import DbConnection
from src.domain.models.dialogs import MessageCreate

class DialogsProvider:
    def __init__(self, db_connection: DbConnection):
        self._db_connection = db_connection

    async def get_dialog_list(self, current_user_id: int, user_id: int) -> list[dict]:
        query = """
        SELECT * FROM otus_hw.dialogs
        WHERE (from_user = $1 AND to_user = $2) OR (from_user = $2 AND to_user = $1)
        ORDER BY created_at DESC;
        """
        async with self._db_connection.get_connection() as conn:
            return await conn.fetch(query, user_id, current_user_id)

    async def send_dialog_message(self, message: MessageCreate) -> dict:
        query = """
        INSERT INTO otus_hw.dialogs (pair_key, from_user, to_user, message)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        """
        async with self._db_connection.get_connection() as conn:
            return await conn.fetchrow(query, message.pair_key, message.from_user, message.to_user, message.message)