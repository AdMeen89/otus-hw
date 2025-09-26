import time
from typing import Set, Optional
import redis.asyncio as redis
from dialogs_app.settings import settings


class HotPairsService:
    """
    Упрощенный сервис для определения горячих пользователей.
    
    Логика: если у пользователя больше 100 сообщений, он становится горячим.
    """
    
    def __init__(self):
        self.redis_client: Optional[redis.Redis] = None
        self._hot_users: Set[int] = set()
        
    async def initialize(self):
        """Инициализация Redis подключения"""
        self.redis_client = redis.from_url(settings.redis_url)
        
    async def close(self):
        """Закрытие Redis подключения"""
        if self.redis_client:
            await self.redis_client.close()
    
    async def record_message(self, from_user: int, to_user: int) -> None:
        """
        Записывает сообщение между пользователями и обновляет метрики
        """
        if not self.redis_client:
            return
            
        # Увеличиваем счетчик сообщений для каждого пользователя
        await self.redis_client.incr(f"user_messages:{from_user}")
        await self.redis_client.incr(f"user_messages:{to_user}")
        
        # Проверяем, стал ли пользователь горячим (больше 100 сообщений)
        from_count = int(await self.redis_client.get(f"user_messages:{from_user}") or 0)
        to_count = int(await self.redis_client.get(f"user_messages:{to_user}") or 0)
        
        if from_count >= 100:
            await self._add_hot_user(from_user)
        if to_count >= 100:
            await self._add_hot_user(to_user)
    
    async def is_hot_pair(self, user1: int, user2: int) -> bool:
        """
        Проверяет, является ли пара пользователей горячей
        """
        return user1 in self._hot_users or user2 in self._hot_users
    
    async def _add_hot_user(self, user_id: int) -> None:
        """Добавляет пользователя в горячие"""
        if user_id not in self._hot_users:
            self._hot_users.add(user_id)
            print(f"User {user_id} promoted to hot (100+ messages)")
    
    async def get_hot_users(self) -> list[int]:
        """
        Возвращает список горячих пользователей
        """
        return list(self._hot_users)
    
    async def promote_user(self, user_id: int) -> bool:
        """
        Принудительно помечает пользователя как горячего
        """
        await self._add_hot_user(user_id)
        return True
    
    async def demote_user(self, user_id: int) -> bool:
        """
        Принудительно охлаждает пользователя
        """
        if user_id in self._hot_users:
            self._hot_users.discard(user_id)
            print(f"User {user_id} demoted from hot")
        return True
    
    async def get_user_message_count(self, user_id: int) -> int:
        """
        Возвращает количество сообщений пользователя
        """
        if not self.redis_client:
            return 0
        return int(await self.redis_client.get(f"user_messages:{user_id}") or 0)