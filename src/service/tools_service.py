from faker import Faker
import time
from datetime import date, timedelta
import bcrypt
from src.models.user import CreateUserRequest
from src.service.user_service import UserService
from src.providers.user_provider import UserProvider
from src.helpers.logger import logger


class ToolsService:
    def __init__(self):
        self.user_service = UserService()
        self.user_provider = UserProvider()
        self.fake = Faker("ru_RU")
        self.batch_size = 1000
        self.default_password = "123456"

    async def generate_users(self, count: int):
        start_time = time.time()
        logger.info(f"Начинаем генерацию {count} пользователей")

        # Сначала удаляем всех существующих пользователей
        logger.info("Удаляем существующих пользователей")
        delete_start = time.time()
        await self.user_provider.delete_all()
        logger.info(
            f"Существующие пользователи удалены за {time.time() - delete_start:.2f} сек"
        )

        # Генерируем данные для пользователей пакетами
        total_created = 0
        while total_created < count:
            batch_start = time.time()

            # Определяем размер текущего пакета
            current_batch_size = min(self.batch_size, count - total_created)

            # Генерируем данные для текущего пакета
            generate_start = time.time()
            users_data = await self._generate_users_data(current_batch_size)
            generate_time = time.time() - generate_start

            # Создаем пользователей текущего пакета
            db_start = time.time()
            logger.info(
                f"Создаем пакет из {current_batch_size}, {len(users_data)} пользователей"
            )
            await self.user_provider.bulk_create(users_data)
            db_time = time.time() - db_start

            # Обновляем счетчик созданных пользователей
            total_created += current_batch_size

            # Логируем прогресс
            batch_time = time.time() - batch_start
            logger.info(
                f"Создано {total_created} из {count} пользователей. "
                f"Время генерации: {generate_time:.2f} сек, "
                f"Время вставки в БД: {db_time:.2f} сек, "
                f"Общее время пакета: {batch_time:.2f} сек"
            )

        total_time = time.time() - start_time
        logger.info(
            f"Генерация {count} пользователей завершена за {total_time:.2f} сек"
        )
        return f"Успешно создано {count} пользователей за {total_time:.2f} сек"

    async def _generate_users_data(self, count: int):
        start_time = time.time()
        logger.info(f"Генерируем пакет из {count} пользователей")
        users_data = []
        logger.info("Генерируем пароль")
        salt = bcrypt.gensalt()
        password = bcrypt.hashpw(self.default_password.encode(), salt).decode()
        logger.info(f"Пароль сгенерирован за {time.time() - start_time:.2f} сек")

        for _ in range(count):
            user_data = CreateUserRequest(
                first_name=self.fake.first_name(),
                last_name=self.fake.last_name(),
                birthday=self.fake.date_of_birth(minimum_age=18, maximum_age=80),
                gender=self.fake.random_element(elements=("male", "female")),
                interests=self.fake.random_element(
                    elements=(
                        "спорт",
                        "музыка",
                        "кино",
                        "чтение",
                        "путешествия",
                        "готовка",
                        "программирование",
                        "фотография",
                        "танцы",
                        "игры",
                    )
                ),
                city=self.fake.city(),
                password=password,
            )
            users_data.append(user_data.model_dump())

        logger.info(f"Пакет сгенерирован за {time.time() - start_time:.2f} сек")
        return users_data
