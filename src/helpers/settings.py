import os
import dotenv


class Settings:
    def __init__(self):
        dotenv.load_dotenv()
        
        self.enable_replication = os.getenv("ENABLE_REPLICATION", "false").lower() == "true"
        self.db_master_url = self._build_db_url("MASTER")
        self.db_slave_urls = self._build_slave_urls()
        self.secret_key = os.getenv("SECRET_KEY")

    # === SLAVE URL BUILDING ===
    
    def _build_slave_urls(self) -> list:
        slave_urls = []
        
        # Сначала проверяем прямой список слейвов через переменную DB_SLAVES
        slaves_env = os.getenv("DB_SLAVES")
        if slaves_env:
            # Формат: "host1:port1,host2:port2,host3:port3"
            slaves_list = slaves_env.split(",")
            for slave_entry in slaves_list:
                if ":" in slave_entry:
                    host, port = slave_entry.strip().split(":", 1)
                    slave_url = self._build_slave_url_from_components(host, port)
                    slave_urls.append(slave_url)
                else:
                    # Только хост, порт по умолчанию
                    host = slave_entry.strip()
                    slave_url = self._build_slave_url_from_components(host, "5432")
                    slave_urls.append(slave_url)
        else:
            # Fallback: ищем SLAVE1, SLAVE2, SLAVE3... пока не закончатся
            slave_index = 1
            while True:
                slave_key = f"SLAVE{slave_index}"
                slave_url = self._try_build_db_url(slave_key)
                if slave_url:
                    slave_urls.append(slave_url)
                    slave_index += 1
                else:
                    break
        
        return slave_urls
    
    def _build_slave_url_from_components(self, host: str, port: str) -> str:
        db_name = os.getenv("DB_NAME", "otus_hw")
        db_user = os.getenv("DB_USER", "otus_hw") 
        db_password = os.getenv("DB_PASSWORD", "otus_hw")
        
        return f"postgresql+asyncpg://{db_user}:{db_password}@{host}:{port}/{db_name}"
    
    # === GENERIC URL BUILDING ===
    
    def _try_build_db_url(self, db_type: str) -> str:
        direct_url = os.getenv(f"DB_{db_type}_PATH")
        if direct_url:
            return direct_url
            
        # Проверяем есть ли хотя бы хост для этого типа
        prefix = f"DB_{db_type}_"
        db_host = os.getenv(f"{prefix}HOST")
        if not db_host:
            return None
            
        # Строим URL из компонентов
        db_port = os.getenv(f"{prefix}PORT", os.getenv("DB_PORT", "5432"))
        db_name = os.getenv(f"{prefix}NAME", os.getenv("DB_NAME", "otus_hw"))
        db_user = os.getenv(f"{prefix}USER", os.getenv("DB_USER", "otus_hw"))
        db_password = os.getenv(f"{prefix}PASSWORD", os.getenv("DB_PASSWORD", "otus_hw"))
        
        return f"postgresql+asyncpg://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"

    def _build_db_url(self, db_type=""):
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

# Более удобные алиасы для роутера
settings = app_settings
settings.DATABASE_URL = app_settings.db_master_url
settings.SLAVE_DATABASE_URLS = app_settings.db_slave_urls
