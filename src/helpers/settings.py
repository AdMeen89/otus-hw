import os
import dotenv


class Settings:
    def __init__(self):
        dotenv.load_dotenv()

        # Настройки для мастера (запись)
        self.db_master_url = self._build_db_url("MASTER")
        
        # Настройки для слейвов (чтение)
        self.db_slave_url = self._build_db_url("SLAVE")
        
        # Обратная совместимость
        self.db_url = self.db_master_url
            
        self.secret_key = os.getenv("SECRET_KEY")

    def _build_db_url(self, db_type=""):
        """Строит URL подключения для указанного типа БД (MASTER/SLAVE)"""
        # Проверяем прямой URL
        direct_url = os.getenv(f"DB_{db_type}_PATH") if db_type else os.getenv("DB_PATH")
        if direct_url:
            return direct_url
            
        # Строим URL из компонентов
        prefix = f"DB_{db_type}_" if db_type else "DB_"
        
        db_host = os.getenv(f"{prefix}HOST", os.getenv("DB_HOST", "localhost"))
        db_port = os.getenv(f"{prefix}PORT", os.getenv("DB_PORT", "5432"))
        db_name = os.getenv(f"{prefix}NAME", os.getenv("DB_NAME", "otus_hw"))
        db_user = os.getenv(f"{prefix}USER", os.getenv("DB_USER", "otus_hw"))
        db_password = os.getenv(f"{prefix}PASSWORD", os.getenv("DB_PASSWORD", "otus_hw"))
        
        return f"postgresql+asyncpg://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"


app_settings = Settings()
