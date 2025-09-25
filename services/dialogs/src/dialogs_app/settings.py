import os


class Settings:
    def __init__(self):
        # Auth
        self.secret_key = os.getenv("SECRET_KEY", "dev-secret")

        # Shards list (comma separated DSN)
        raw = os.getenv("DIALOG_SHARDS")
        if raw:
            self.dialog_shards = [dsn.strip() for dsn in raw.split(",") if dsn.strip()]
        else:
            self.dialog_shards = [
                "postgresql://postgres:otus_hw@haproxy:5432/postgres",
                "postgresql://postgres:otus_hw@haproxy:5432/postgres",
                "postgresql://postgres:otus_hw@haproxy:5432/postgres",
            ]

        # Redis
        self.redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")

        # Hot thresholds (dev defaults)
        self.hot_pair_rate_limit = int(os.getenv("HOT_PAIR_RATE_LIMIT", "30"))
        self.hot_pair_window_sec = int(os.getenv("HOT_PAIR_WINDOW_SEC", "60"))
        self.hot_pair_ttl_sec = int(os.getenv("HOT_PAIR_TTL_SEC", "180"))


settings = Settings()


