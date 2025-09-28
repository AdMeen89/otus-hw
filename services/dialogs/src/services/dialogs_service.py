from src.infra.db.dialogs_provider import DialogsProvider
from src.domain.models.dialogs import Dialog, MessageCreate
from src.infra.redis.hot_pairs_provider import HotPairsProvider

class DialogsService:
    def __init__(self, dialogs_provider: DialogsProvider, hot_pairs_provider: HotPairsProvider):
        self._dialogs_provider = dialogs_provider
        self._hot_pairs_provider = hot_pairs_provider

    async def get_dialog_list(self, current_user_id: int, user_id: int) -> list[Dialog]:
        dialogs = await self._dialogs_provider.get_dialog_list(
            current_user_id=current_user_id, user_id=user_id
        )
        return [Dialog(**dict(record)) for record in dialogs]

    async def send_dialog_message(
        self, current_user_id: int, user_id: int, message: str
    ) -> Dialog:
        pair_key = self._pair_key(current_user_id, user_id)
        message = MessageCreate(
            pair_key=pair_key,
            from_user=current_user_id,
            to_user=user_id,
            message=message,
        )
        await self._hot_pairs_provider.record_message(pair_key)
        record = await self._dialogs_provider.send_dialog_message(message=message)
        if record is None:
            raise RuntimeError("Failed to persist dialog message")
        return Dialog(**dict(record))

    async def get_hot_users(self) -> list[int]:
        return await self._hot_pairs_provider.get_hot_pairs()

    @staticmethod
    def _pair_key(a: int, b: int) -> int:
        x, y = (a, b) if a <= b else (b, a)
        return (x << 32) | y
