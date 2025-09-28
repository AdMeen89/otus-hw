import os
import dotenv


class Settings:
    def __init__(self):
        dotenv.load_dotenv()

        self.secret_key = os.getenv("SECRET_KEY")
        self.db_master_url = os.getenv("DB_MASTER_URL")
        self.redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
        self.hot_pair_window_sec = int(os.getenv("HOT_PAIR_WINDOW_SEC"))
        self.hot_pair_threshold = int(os.getenv("HOT_PAIR_RATE_LIMIT"))
        self.hot_pair_active_ttl_sec = int(os.getenv("HOT_PAIR_TTL_SEC"))

settings = Settings()
