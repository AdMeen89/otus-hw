import asyncio
import os
from src.service.feed_worker_kafka import FeedKafkaWorker
from src.database.connection import init_database, close_database


async def main() -> None:
    brokers = os.getenv("KAFKA_BROKERS", "redpanda:9092")
    await init_database()
    try:
        worker = FeedKafkaWorker(brokers=brokers)
        await worker.run()
    finally:
        await close_database()


if __name__ == "__main__":
    asyncio.run(main())


