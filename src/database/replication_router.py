import asyncpg
import threading
import re
from typing import Optional, List, Dict, Any
from contextlib import asynccontextmanager
from src.helpers.logger import logger
from src.helpers.settings import settings


class ReplicationRoutingDataSource:
    """
    DataSource роутер для автоматического выбора между master и slave
    на основе типа SQL операции с round-robin балансировкой
    """
    
    def __init__(self):
        # Конвертируем SQLAlchemy URL в asyncpg URL
        self.master_url = self._convert_url(settings.DATABASE_URL)
        self.slave_urls = [self._convert_url(url) for url in settings.SLAVE_DATABASE_URLS]
        
        self._master_pool: Optional[asyncpg.Pool] = None
        self._slave_pools: List[Optional[asyncpg.Pool]] = [None] * len(self.slave_urls)
        
        # Round-robin счетчик и статистика (thread-safe)
        self._lock = threading.Lock() 
        self._current_slave_index = 0
        self._slave_access_counts = [0] * len(self.slave_urls)
        self._master_access_count = 0
        self._slave_failures = [0] * len(self.slave_urls)
        
        logger.info(f"🔄 Initialized replication router with {len(self.slave_urls)} slaves")
        
    def _convert_url(self, sqlalchemy_url: str) -> str:
        """Конвертирует SQLAlchemy URL в asyncpg URL"""
        if sqlalchemy_url.startswith("postgresql+asyncpg://"):
            return sqlalchemy_url.replace("postgresql+asyncpg://", "postgresql://")
        return sqlalchemy_url
        
    async def initialize(self):
        """Инициализация пулов соединений"""
        try:
            # Создаем пул для мастера
            self._master_pool = await asyncpg.create_pool(
                self.master_url,
                min_size=5,
                max_size=20,
                command_timeout=60
            )
            logger.info("✅ Master pool initialized")
            
            # Создаем пулы для всех слейвов из массива
            for i, slave_url in enumerate(self.slave_urls):
                try:
                    self._slave_pools[i] = await asyncpg.create_pool(
                        slave_url,
                        min_size=3,
                        max_size=15,
                        command_timeout=60
                    )
                    logger.info(f"✅ Slave {i+1}/{len(self.slave_urls)} pool initialized")
                except Exception as e:
                    logger.warning(f"⚠️ Failed to initialize slave {i+1}: {e}")
                    self._slave_pools[i] = None
                    
        except Exception as e:
            logger.error(f"❌ Failed to initialize master pool: {e}")
            raise
    
    async def close(self):
        """Закрытие всех пулов"""
        if self._master_pool:
            await self._master_pool.close()
            
        for pool in self._slave_pools:
            if pool:
                await pool.close()
    
    def _is_read_operation(self, query: str) -> bool:
        """Определяет является ли операция read-only"""
        # Убираем комментарии и лишние пробелы
        clean_query = re.sub(r'--.*?\n|/\*.*?\*/', '', query, flags=re.DOTALL)
        clean_query = clean_query.strip().upper()
        
        # Проверяем что это SELECT запрос
        if clean_query.startswith('SELECT'):
            # Исключаем SELECT FOR UPDATE/SHARE
            if 'FOR UPDATE' in clean_query or 'FOR SHARE' in clean_query:
                return False
            return True
            
        # SHOW, EXPLAIN также считаем read операциями
        if clean_query.startswith(('SHOW', 'EXPLAIN')):
            return True
            
        return False
    
    def _get_next_slave_pool(self) -> tuple[Optional[asyncpg.Pool], int]:
        """
        Получает следующий слейв пул по round-robin алгоритму
        Возвращает (pool, index) или (None, -1) если нет здоровых слейвов
        """
        if not self.slave_urls:
            return None, -1
        
        with self._lock:
            # Ищем здоровые слейвы, начиная с текущего индекса
            attempts = 0
            original_index = self._current_slave_index
            
            while attempts < len(self.slave_urls):
                current_index = self._current_slave_index
                pool = self._slave_pools[current_index]
                
                # Переходим к следующему слейву для следующего запроса
                self._current_slave_index = (self._current_slave_index + 1) % len(self.slave_urls)
                
                if pool is not None:
                    # Увеличиваем счетчик обращений к этому слейву
                    self._slave_access_counts[current_index] += 1
                    logger.debug(f"🎯 Selected slave {current_index+1}/{len(self.slave_urls)} for read operation (round-robin)")
                    return pool, current_index
                
                attempts += 1
            
            # Все слейвы недоступны
            return None, -1
    
    def _increment_master_access(self):
        """Увеличивает счетчик обращений к мастеру (thread-safe)"""
        with self._lock:
            self._master_access_count += 1
    
    def _increment_slave_failure(self, slave_index: int):
        """Увеличивает счетчик ошибок слейва (thread-safe)"""
        if 0 <= slave_index < len(self._slave_failures):
            with self._lock:
                self._slave_failures[slave_index] += 1

    @asynccontextmanager
    async def get_connection(self, query: str = "", force_master: bool = False):
        """
        Получает соединение на основе типа операции
        
        Args:
            query: SQL запрос для анализа
            force_master: Принудительно использовать master (для транзакций)
        """
        use_master = force_master or not self._is_read_operation(query)
        
        if use_master:
            # Используем master
            if not self._master_pool:
                raise RuntimeError("Master pool not initialized")
                
            self._increment_master_access()
            async with self._master_pool.acquire() as connection:
                logger.debug("📝 Using MASTER for write operation")
                yield connection
        else:
            # Пытаемся использовать слейв по round-robin
            slave_pool, slave_index = self._get_next_slave_pool()
            
            if slave_pool:
                try:
                    async with slave_pool.acquire() as connection:
                        logger.debug(f"📖 Using SLAVE {slave_index+1} for read operation")
                        yield connection
                except Exception as e:
                    self._increment_slave_failure(slave_index)
                    logger.warning(f"⚠️ Slave {slave_index+1} connection failed: {e}, falling back to master")
                    # Fallback на master
                    self._increment_master_access()
                    async with self._master_pool.acquire() as connection:
                        logger.debug("📝 Using MASTER (fallback) for read operation")
                        yield connection
            else:
                # Все слейвы недоступны, используем master
                logger.warning("⚠️ No healthy slaves available, using master for read")
                self._increment_master_access()
                async with self._master_pool.acquire() as connection:
                    logger.debug("📝 Using MASTER (no slaves) for read operation")
                    yield connection
    
    @asynccontextmanager 
    async def get_transaction(self):
        """Получает транзакционное соединение (всегда master)"""
        if not self._master_pool:
            raise RuntimeError("Master pool not initialized")
        
        self._increment_master_access()    
        async with self._master_pool.acquire() as connection:
            async with connection.transaction():
                logger.debug("🔄 Transaction started on MASTER")
                yield connection
    
    async def execute(self, query: str, *args, **kwargs):
        """Выполняет запрос с автоматическим роутингом"""
        async with self.get_connection(query) as conn:
            return await conn.execute(query, *args, **kwargs)
    
    async def fetch(self, query: str, *args, **kwargs):
        """Выполняет SELECT запрос с автоматическим роутингом"""
        async with self.get_connection(query) as conn:
            return await conn.fetch(query, *args, **kwargs)
    
    async def fetchrow(self, query: str, *args, **kwargs):
        """Выполняет SELECT запрос и возвращает одну строку"""
        async with self.get_connection(query) as conn:
            return await conn.fetchrow(query, *args, **kwargs)
    
    async def fetchval(self, query: str, *args, **kwargs):
        """Выполняет SELECT запрос и возвращает одно значение"""
        async with self.get_connection(query) as conn:
            return await conn.fetchval(query, *args, **kwargs)
    
    def get_stats(self) -> Dict[str, Any]:
        """Возвращает статистику использования пулов"""
        with self._lock:
            total_requests = self._master_access_count + sum(self._slave_access_counts)
            
            stats = {
                "total_requests": total_requests,
                "master": {
                    "requests": self._master_access_count,
                    "percentage": round(self._master_access_count / max(total_requests, 1) * 100, 2)
                },
                "slaves": []
            }
            
            for i, (requests, failures) in enumerate(zip(self._slave_access_counts, self._slave_failures)):
                slave_stats = {
                    "index": i + 1,
                    "url": self.slave_urls[i],
                    "requests": requests,
                    "failures": failures,
                    "percentage": round(requests / max(total_requests, 1) * 100, 2),
                    "healthy": self._slave_pools[i] is not None
                }
                stats["slaves"].append(slave_stats)
            
            return stats
    
    def reset_stats(self):
        """Сбрасывает статистику"""
        with self._lock:
            self._master_access_count = 0
            self._slave_access_counts = [0] * len(self.slave_urls)
            self._slave_failures = [0] * len(self.slave_urls)
        logger.info("📊 Statistics reset")


# Глобальный экземпляр роутера
router = ReplicationRoutingDataSource() 