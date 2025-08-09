from abc import ABC, abstractmethod
from contextlib import asynccontextmanager
from typing import Any, Optional


class RoutingDataSource(ABC):
    """
    Абстрактный класс для маршрутизации подключений к базе данных.
    
    Определяет интерфейс для различных типов роутеров (single database, replication, etc.)
    """

    @abstractmethod
    async def initialize(self) -> None:
        """
        Инициализирует пулы подключений к базе данных.
        
        Должен быть вызван один раз при старте приложения перед началом работы с БД.
        """
        pass

    @abstractmethod
    async def close(self) -> None:
        """
        Закрывает все пулы подключений к базе данных.
        
        Должен быть вызван при завершении работы приложения для корректного освобождения ресурсов.
        """
        pass

    @abstractmethod
    @asynccontextmanager
    async def get_connection(self, query: str = "", force_master: bool = False):
        """
        Получает подключение к базе данных в контексте async context manager.
        
        Args:
            query: SQL запрос для анализа типа операции (read/write)
            force_master: Принудительно использовать master базу для запроса
            
        Yields:
            Connection: Объект подключения к базе данных
        """
        pass

    @abstractmethod
    @asynccontextmanager
    async def get_transaction(self):
        """
        Получает подключение с активной транзакцией в контексте async context manager.
        
        Всегда использует master базу данных для обеспечения консистентности.
        
        Yields:
            Connection: Объект подключения к базе данных с активной транзакцией
        """
        pass

    async def execute(self, query: str, *args, **kwargs) -> Any:
        """
        Выполняет SQL запрос и возвращает количество затронутых строк.
        
        Args:
            query: SQL запрос для выполнения
            *args: Позиционные параметры для запроса
            **kwargs: Именованные параметры для запроса
            
        Returns:
            Результат выполнения запроса
        """
        async with self.get_connection(query) as conn:
            return await conn.execute(query, *args, **kwargs)

    async def fetch(self, query: str, *args, **kwargs) -> list:
        """
        Выполняет SELECT запрос и возвращает все строки результата.
        
        Args:
            query: SQL запрос для выполнения
            *args: Позиционные параметры для запроса
            **kwargs: Именованные параметры для запроса
            
        Returns:
            Список записей из результата запроса
        """
        async with self.get_connection(query) as conn:
            return await conn.fetch(query, *args, **kwargs)

    async def fetchrow(self, query: str, *args, **kwargs) -> Optional[Any]:
        """
        Выполняет SELECT запрос и возвращает первую строку результата.
        
        Args:
            query: SQL запрос для выполнения
            *args: Позиционные параметры для запроса
            **kwargs: Именованные параметры для запроса
            
        Returns:
            Первая запись из результата запроса или None
        """
        async with self.get_connection(query) as conn:
            return await conn.fetchrow(query, *args, **kwargs)

    async def fetchval(self, query: str, *args, **kwargs) -> Any:
        """
        Выполняет SELECT запрос и возвращает значение первого столбца первой строки.
        
        Args:
            query: SQL запрос для выполнения
            *args: Позиционные параметры для запроса
            **kwargs: Именованные параметры для запроса
            
        Returns:
            Значение из первого столбца первой строки результата
        """
        async with self.get_connection(query) as conn:
            return await conn.fetchval(query, *args, **kwargs) 