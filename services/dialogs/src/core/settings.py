import os
import dotenv


class Settings:
    def __init__(self):
        dotenv.load_dotenv()

        self.secret_key = os.getenv("SECRET_KEY")
        self.db_master_url = os.getenv("DB_MASTER_URL")

settings = Settings()