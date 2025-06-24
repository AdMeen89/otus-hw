import os
import dotenv


class Settings:
    def __init__(self):
        dotenv.load_dotenv()

        # Приоритет: DB_PATH > составление из компонентов
        self.db_url = os.getenv("DB_PATH")
        if not self.db_url:
            db_host = os.getenv("DB_HOST", "localhost")
            db_port = os.getenv("DB_PORT", "5432")
            db_name = os.getenv("DB_NAME", "otus_hw")
            db_user = os.getenv("DB_USER", "otus_hw")
            db_password = os.getenv("DB_PASSWORD", "otus_hw")
            self.db_url = f"postgresql+asyncpg://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
            
        self.secret_key = os.getenv("SECRET_KEY")


app_settings = Settings()
