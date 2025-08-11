from celery import Celery
import os


def make_celery() -> Celery:
    broker_url = os.getenv("CELERY_BROKER_URL", os.getenv("REDIS_URL", "redis://redis:6379/0"))
    backend_url = os.getenv("CELERY_RESULT_BACKEND", broker_url)
    app = Celery(
        "otus_hw",
        broker=broker_url,
        backend=backend_url,
        include=[
            "src.tasks.feed_tasks",
        ],
    )
    app.conf.update(
        task_serializer="json",
        accept_content=["json"],
        result_serializer="json",
        timezone="UTC",
        task_acks_late=True,
        worker_prefetch_multiplier=10,
    )
    return app


celery_app = make_celery()


