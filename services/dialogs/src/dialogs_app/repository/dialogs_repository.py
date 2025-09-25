from typing import List, Dict

from dialogs_app.db.shard_router import ShardRouter




class DialogsRepository:
    def __init__(self, router: ShardRouter):
        self.router = router

    @staticmethod
    def _pair_key(from_user: int, to_user: int) -> int:
        a, b = (from_user, to_user) if from_user <= to_user else (to_user, from_user)
        return (a << 32) | b


    async def get_dialog(self, current_user_id: int, other_user_id: int) -> List[Dict]:
        sql = """
        SELECT id, pair_key, from_user, to_user, last_message, updated_at
        FROM otus_hw.dialogs
        WHERE (from_user=$1 AND to_user=$2) OR (from_user=$2 AND to_user=$1)
        """
        async with self.router.acquire(current_user_id, other_user_id) as conn:
            rows = await conn.fetch(sql, current_user_id, other_user_id)
            return [dict(r) for r in rows]

    async def upsert_dialog(self, current_user_id: int, other_user_id: int, last_message: str = "") -> Dict:
        pk = self._pair_key(current_user_id, other_user_id)
        sql = """
        INSERT INTO otus_hw.dialogs (pair_key, from_user, to_user, last_message)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (pair_key, from_user, to_user)
        DO UPDATE SET last_message=EXCLUDED.last_message, updated_at=NOW()
        RETURNING id, pair_key, from_user, to_user, last_message, updated_at
        """
        a, b = (current_user_id, other_user_id) if current_user_id <= other_user_id else (other_user_id, current_user_id)
        async with self.router.acquire(current_user_id, other_user_id) as conn:
            row = await conn.fetchrow(sql, pk, a, b, last_message)
            return dict(row) if row else {}


