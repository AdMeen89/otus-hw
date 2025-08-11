from src.providers.friend_provider import FriendProvider
from src.models.friend import UserFriend
from src.service.event_bus import KafkaEventBus


class FriendService:
    def __init__(self):
        self.friend_provider = FriendProvider()
        self.event_bus = KafkaEventBus()

    async def set_friend(self, user_id: int, friend_id: int):
        await self.friend_provider.create(user_id, friend_id)
        await self.event_bus.publish_friend_added({"user_id": user_id, "friend_id": friend_id})

    async def get_friends(self, user_id: int) -> list[UserFriend]:
        return await self.friend_provider.get_by_user_id(user_id)

    async def delete_friend(self, user_id: int, friend_id: int):
        await self.friend_provider.delete_by_user_id_and_friend_id(user_id, friend_id)
        await self.event_bus.publish_friend_removed({"user_id": user_id, "friend_id": friend_id})