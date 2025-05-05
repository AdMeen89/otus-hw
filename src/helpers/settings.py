import os
import dotenv


class Settings:
    def __init__(self):
        dotenv.load_dotenv()

        self.db_url = os.getenv("DB_PATH")
        self.secret_key = os.getenv("SECRET_KEY")


app_settings = Settings()
