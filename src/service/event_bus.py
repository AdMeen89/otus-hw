from abc import ABC, abstractmethod
from typing import Any, Dict
import os
import json
from src.helpers.logger import logger
from src.helpers.redis_client import get_redis
from src.helpers.settings import settings
from aiokafka import AIOKafkaProducer


class EventBus(ABC):
    @abstractmethod
    async def publish_post_created(self, event: Dict[str, Any]) -> None:
        ...

    @abstractmethod
    async def publish_friend_added(self, event: Dict[str, Any]) -> None:
        ...

    @abstractmethod
    async def publish_friend_removed(self, event: Dict[str, Any]) -> None:
        ...


class NullEventBus(EventBus):
    async def publish_post_created(self, event: Dict[str, Any]) -> None:
        logger.debug(f"Event(PostCreated) noop: {event}")

    async def publish_friend_added(self, event: Dict[str, Any]) -> None:
        logger.debug(f"Event(FriendAdded) noop: {event}")

    async def publish_friend_removed(self, event: Dict[str, Any]) -> None:
        logger.debug(f"Event(FriendRemoved) noop: {event}")


class RedisStreamsEventBus(EventBus):
    async def publish_post_created(self, event: Dict[str, Any]) -> None:
        r = await get_redis()
        await r.xadd(settings.feed_stream_posts, event, id="*")

    async def publish_friend_added(self, event: Dict[str, Any]) -> None:
        r = await get_redis()
        await r.xadd(settings.feed_stream_friendships, event, id="*")

    async def publish_friend_removed(self, event: Dict[str, Any]) -> None:
        r = await get_redis()
        await r.xadd(settings.feed_stream_friendships, event, id="*")


class KafkaEventBus(EventBus):
    def __init__(self) -> None:
        self._producer: AIOKafkaProducer | None = None

    async def _get_producer(self) -> AIOKafkaProducer:
        if self._producer is None:
            self._producer = AIOKafkaProducer(bootstrap_servers=os.getenv("KAFKA_BROKERS", "redpanda:9092").split(","))
            await self._producer.start()
        return self._producer

    async def publish_post_created(self, event: Dict[str, Any]) -> None:
        producer = await self._get_producer()
        await producer.send_and_wait("feed.posts", json.dumps(event).encode("utf-8"), key=str(event.get("author_id")).encode("utf-8"))

    async def publish_friend_added(self, event: Dict[str, Any]) -> None:
        producer = await self._get_producer()
        await producer.send_and_wait("feed.friendships", json.dumps(event).encode("utf-8"), key=str(event.get("user_id")).encode("utf-8"))

    async def publish_friend_removed(self, event: Dict[str, Any]) -> None:
        producer = await self._get_producer()
        await producer.send_and_wait("feed.friendships", json.dumps(event).encode("utf-8"), key=str(event.get("user_id")).encode("utf-8"))


