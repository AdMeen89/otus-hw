import os
from typing import List, Tuple

import dotenv


class Settings:
    def __init__(self):
        dotenv.load_dotenv()

        self.secret_key = os.getenv("SECRET_KEY")
        self.db_master_url = os.getenv("DB_MASTER_URL")
        self.redis_url = os.getenv("REDIS_URL")
        self.hot_pair_window_sec = int(os.getenv("HOT_PAIR_WINDOW_SEC"))
        self.hot_pair_threshold = int(os.getenv("HOT_PAIR_RATE_LIMIT"))
        self.hot_pair_active_ttl_sec = int(os.getenv("HOT_PAIR_TTL_SEC"))
        self.hot_worker_nodes: List[Tuple[str, int]] = self._parse_hot_workers(
            os.getenv("HOT_WORKER_NODES", "")
        )

    @staticmethod
    def _parse_hot_workers(raw: str) -> List[Tuple[str, int]]:
        nodes: List[Tuple[str, int]] = []
        for item in raw.split(","):
            value = item.strip()
            if not value:
                continue
            if ":" in value:
                host, port = value.split(":", 1)
            else:
                host, port = value, "5432"
            try:
                nodes.append((host, int(port)))
            except ValueError:
                continue
        return nodes

settings = Settings()
