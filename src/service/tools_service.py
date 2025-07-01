import asyncio
from faker import Faker
import time
import bcrypt
from src.service.user_service import UserService
from src.providers.user_provider import UserProvider
from src.helpers.logger import logger


class ToolsService:
    def __init__(self):
        self.user_service = UserService()
        self.user_provider = UserProvider()
        self.fake = Faker("ru_RU")
        self.default_password = "123456"

        self.max_concurrent_operations = 5
        self.max_batch_size = 30000
        
        # Предгенерируем данные для ускорения
        self._pregenerated_password = None
        self._pregenerated_data = {
            'first_names': [],
            'last_names': [],
            'cities': [],
            'interests': ["спорт", "музыка", "кино", "чтение", "путешествия", 
                         "готовка", "программирование", "фотография", "танцы", "игры"],
            'genders': ["male", "female"]
        }

    async def generate_users(self, count: int):
        start_time = time.time()
        logger.info(f"Начинаем генерацию {count} пользователей")

        # Предгенерируем данные
        self._pregenerate_data()

        # Сначала удаляем всех существующих пользователей
        logger.info("Удаляем существующих пользователей")
        delete_start = time.time()
        await self.user_provider.delete_all()
        logger.info(
            f"Существующие пользователи удалены за {time.time() - delete_start:.2f} сек"
        )

        # Создаем семафор для ограничения одновременных операций с БД
        db_semaphore = asyncio.Semaphore(self.max_concurrent_operations)
        
        # Разбиваем на большие пакеты
        batches = []
        remaining = count
        while remaining > 0:
            batch_size = min(self.max_batch_size, remaining)
            batches.append(batch_size)
            remaining -= batch_size

        logger.info(f"Создано {len(batches)} пакетов для обработки")

        # Создаем все задачи сразу
        tasks = []
        for i, batch_size in enumerate(batches):
            task = asyncio.create_task(
                self._create_batch_optimized(db_semaphore, batch_size, i + 1)
            )
            tasks.append(task)

        # Выполняем все задачи параллельно
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Проверяем ошибки
        errors = [r for r in results if isinstance(r, Exception)]
        if errors:
            logger.error(f"Ошибки при создании: {errors}")
            raise Exception(f"Ошибки: {len(errors)} из {len(tasks)}")

        total_time = time.time() - start_time
        logger.info(
            f"Генерация {count} пользователей завершена за {total_time:.2f} сек"
        )
        return f"Успешно создано {count} пользователей за {total_time:.2f} сек"

    async def _create_batch_optimized(self, semaphore: asyncio.Semaphore, batch_size: int, batch_num: int):
        """Оптимизированное создание пакета"""
        async with semaphore:
            batch_start = time.time()
            
            # Быстрая генерация данных
            users_data = self._generate_users_data_fast(batch_size)
            
            # Вставка в БД
            await self.user_provider.bulk_create(users_data)
            
            batch_time = time.time() - batch_start
            logger.info(f"Пакет №{batch_num} ({batch_size} пользователей) создан за {batch_time:.2f} сек")
            
            return batch_size
        
    def _pregenerate_data(self):
        """Предгенерация данных для ускорения создания пользователей"""
        if not self._pregenerated_password:
            logger.info("Предгенерируем пароль и данные...")
            start = time.time()
            
            # Генерируем пароль один раз
            salt = bcrypt.gensalt()
            self._pregenerated_password = bcrypt.hashpw(self.default_password.encode(), salt).decode()
            
            # Предгенерируем списки имен и городов
            self._pregenerated_data['first_names'] = [self.fake.first_name() for _ in range(1000)]
            self._pregenerated_data['last_names'] = [self.fake.last_name() for _ in range(1000)]
            self._pregenerated_data['cities'] = [self.fake.city() for _ in range(200)]
            
            logger.info(f"Предгенерация завершена за {time.time() - start:.2f} сек")


    def _generate_users_data_fast(self, count: int):
        """Быстрая генерация данных без лишних вызовов"""
        import random
        from datetime import date, timedelta
        
        users_data = []
        
        # Предгенерированные данные
        first_names = self._pregenerated_data['first_names']
        last_names = self._pregenerated_data['last_names'] 
        cities = self._pregenerated_data['cities']
        interests = self._pregenerated_data['interests']
        genders = self._pregenerated_data['genders']
        password = self._pregenerated_password
        
        # Базовая дата для генерации дней рождения
        today = date.today()
        min_date = today - timedelta(days=80*365)  # 80 лет назад
        max_date = today - timedelta(days=18*365)  # 18 лет назад
        date_range = (max_date - min_date).days
        
        for _ in range(count):
            # Используем random вместо faker для скорости
            birthday = min_date + timedelta(days=random.randint(0, date_range))
            
            user_data = {
                "first_name": random.choice(first_names),
                "last_name": random.choice(last_names),
                "birthday": birthday,
                "gender": random.choice(genders),
                "interests": random.choice(interests),
                "city": random.choice(cities),
                "password": password,
            }
            users_data.append(user_data)
        
        return users_data