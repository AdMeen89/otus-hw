import asyncio
import random
from faker import Faker
import time
import bcrypt
from src.service.user_service import UserService
from src.service.event_bus import KafkaEventBus
from src.providers.user_provider import UserProvider
from src.helpers.logger import logger
from src.database.connection import router as db_router
from src.providers.post_provider import PostProvider


class ToolsService:
    def __init__(self):
        self.user_service = UserService()
        self.user_provider = UserProvider()
        self.fake = Faker("ru_RU")
        self.default_password = "123456"

        self.max_concurrent_operations = 5
        self.max_batch_size = 30000
        
        self._pregenerated_password = None
        # Популярные имена и фамилии (высокочастотные для РФ)
        self.popular_male_names = [
            'Александр', 'Сергей', 'Дмитрий', 'Андрей', 'Алексей', 'Максим', 'Иван', 'Артём',
            'Владимир', 'Михаил', 'Роман', 'Денис', 'Евгений', 'Никита', 'Антон', 'Павел',
            'Виктор', 'Игорь', 'Константин', 'Николай', 'Олег', 'Кирилл', 'Илья', 'Василий',
            'Егор', 'Владислав', 'Данил', 'Артур', 'Станислав', 'Руслан'
        ]
        
        self.popular_female_names = [
            'Елена', 'Ольга', 'Наталья', 'Татьяна', 'Ирина', 'Анна', 'Светлана', 'Мария',
            'Людмила', 'Галина', 'Екатерина', 'Надежда', 'Любовь', 'Валентина', 'Анастасия',
            'Марина', 'Юлия', 'Вера', 'Лариса', 'Дарья', 'Алина', 'Виктория', 'Полина',
            'Арина', 'Ксения', 'Валерия', 'Оксана', 'Инна', 'Алла', 'Жанна'
        ]
        
        self.popular_male_surnames = [
            'Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов',
            'Новиков', 'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семёнов', 'Егоров',
            'Павлов', 'Козлов', 'Степанов', 'Николаев', 'Орлов', 'Андреев', 'Макаров', 'Никитин',
            'Захаров', 'Зайцев', 'Соловьёв', 'Борисов', 'Яковлев', 'Григорьев'
        ]
        
        self.popular_female_surnames = [
            'Иванова', 'Смирнова', 'Кузнецова', 'Попова', 'Васильева', 'Петрова', 'Соколова', 'Михайлова',
            'Новикова', 'Фёдорова', 'Морозова', 'Волкова', 'Алексеева', 'Лебедева', 'Семёнова', 'Егорова',
            'Павлова', 'Козлова', 'Степанова', 'Николаева', 'Орлова', 'Андреева', 'Макарова', 'Никитина',
            'Захарова', 'Зайцева', 'Соловьёва', 'Борисова', 'Яковлева', 'Григорьева'
        ]

        self._pregenerated_data = {
            'male_first_names': [],
            'male_last_names': [],
            'female_first_names': [],
            'female_last_names': [],
            'cities': [],
            'interests': ["спорт", "музыка", "кино", "чтение", "путешествия", 
                         "готовка", "программирование", "фотография", "танцы", "игры"],
            'genders': ["male", "female"]
        }
        self.event_bus = KafkaEventBus()

    async def get_database_health(self):
        num_slaves = len(db_router._slave_pools) if db_router._slave_pools else 0
        
        health_status = {
            "overall_status": "healthy",
            "databases": {"master": {"status": "unknown", "error": None}},
            "details": {"master": "Подключение для записи (INSERT, UPDATE, DELETE)"}
        }
        
        for i in range(num_slaves):
            slave_key = f"slave{i+1}"
            health_status["databases"][slave_key] = {"status": "unknown", "error": None}
            health_status["details"][slave_key] = "Подключение для чтения (SELECT)"
        
        try:
            async with db_router.get_connection("INSERT", force_master=True) as conn:
                await conn.fetchval("SELECT 1")
            health_status["databases"]["master"]["status"] = "healthy"
        except Exception as e:
            health_status["databases"]["master"]["status"] = "unhealthy"
            health_status["databases"]["master"]["error"] = str(e)
            health_status["overall_status"] = "degraded"
        
        for i, slave_pool in enumerate(db_router._slave_pools):
            slave_key = f"slave{i+1}"
            if slave_pool is None:
                health_status["databases"][slave_key]["status"] = "unavailable"
                health_status["databases"][slave_key]["error"] = "Pool not initialized"
                continue
                
            try:
                async with slave_pool.acquire() as conn:
                    await conn.fetchval("SELECT 1")
                health_status["databases"][slave_key]["status"] = "healthy"
            except Exception as e:
                health_status["databases"][slave_key]["status"] = "unhealthy"
                health_status["databases"][slave_key]["error"] = str(e)
                if health_status["overall_status"] == "healthy":
                    health_status["overall_status"] = "degraded"
        
        if health_status["databases"]["master"]["status"] != "healthy":
            health_status["overall_status"] = "critical"
        
        return health_status

    async def generate_users(self, count: int, use_selectivity: bool = False):
        start_time = time.time()
        logger.info(f"Начинаем генерацию {count} пользователей с учетом селективности: {use_selectivity}")

        self._pregenerate_data()

        logger.info("Удаляем существующих пользователей")
        delete_start = time.time()
        await self.user_provider.delete_all()
        logger.info(
            f"Существующие пользователи удалены за {time.time() - delete_start:.2f} сек"
        )

        db_semaphore = asyncio.Semaphore(self.max_concurrent_operations)
        
        batches = []
        remaining = count
        while remaining > 0:
            batch_size = min(self.max_batch_size, remaining)
            batches.append(batch_size)
            remaining -= batch_size

        logger.info(f"Создано {len(batches)} пакетов для обработки")

        tasks = []
        for i, batch_size in enumerate(batches):
            task = asyncio.create_task(
                self._create_batch_optimized(db_semaphore, batch_size, i + 1, use_selectivity)
            )
            tasks.append(task)

        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        errors = [r for r in results if isinstance(r, Exception)]
        if errors:
            logger.error(f"Ошибки при создании: {errors}")
            raise Exception(f"Ошибки: {len(errors)} из {len(tasks)}")

        total_time = time.time() - start_time
        logger.info(
            f"Генерация {count} пользователей завершена за {total_time:.2f} сек"
        )
        return f"Успешно создано {count} пользователей за {total_time:.2f} сек"

    # === POSTS GENERATION ===

    async def generate_posts_for_user(self, user_id: int, count: int = 10) -> int:
        provider = PostProvider()
        created = 0
        for _ in range(count):
            text = self.fake.sentence(nb_words=12)
            row = await provider.create(user_id, text)
            # опубликуем событие, чтобы воркер сразу положил пост в ленты подписчиков
            await self.event_bus.publish_post_created({
                "post_id": row["id"],
                "author_id": row["user_id"],
                "created_at": row["created_at"].isoformat(),
            })
            created += 1 if row else 0
        return created

    async def generate_posts_for_all_users(self, count_per_user: int = 3) -> int:
        ids = await self.user_provider.get_all_ids()
        total = 0
        for uid in ids:
            total += await self.generate_posts_for_user(uid, count_per_user)
        return total

    # === BATCH PROCESSING ===

    async def _create_batch_optimized(self, semaphore: asyncio.Semaphore, batch_size: int, batch_num: int, use_selectivity: bool = False):
        async with semaphore:
            batch_start = time.time()
            
            users_data = self._generate_users_data(batch_size, use_selectivity)
            
            await self.user_provider.bulk_create(users_data)
            
            batch_time = time.time() - batch_start
            logger.info(f"Пакет №{batch_num} ({batch_size} пользователей) создан за {batch_time:.2f} сек")
            
            return batch_size

    # === DATA GENERATION ===
    
    def _get_weighted_value(self, populars: list, mixed: list) -> str:
        if random.random() < 0.7:
            return random.choice(populars)
        else:
            return random.choice(mixed)
        
    def _pregenerate_data(self):
        if not self._pregenerated_password:
            logger.info("Предгенерируем пароль и данные...")
            start = time.time()
            
            salt = bcrypt.gensalt()
            self._pregenerated_password = bcrypt.hashpw(self.default_password.encode(), salt).decode()
            
            # Генерируем имена и фамилии отдельно для мужчин и женщин
            self._pregenerated_data['male_first_names'] = [self.fake.first_name_male() for _ in range(500)]
            self._pregenerated_data['male_last_names'] = [self.fake.last_name_male() for _ in range(500)]
            self._pregenerated_data['female_first_names'] = [self.fake.first_name_female() for _ in range(500)]
            self._pregenerated_data['female_last_names'] = [self.fake.last_name_female() for _ in range(500)]
            self._pregenerated_data['cities'] = [self.fake.city() for _ in range(200)]
            
            logger.info(f"Предгенерация завершена за {time.time() - start:.2f} сек")

    def _generate_users_data(self, count: int, use_selectivity: bool = False):
        import random
        from datetime import date, timedelta
        
        users_data = []
        
        # Разделяем данные по полу
        male_first_names = self._pregenerated_data['male_first_names']
        male_last_names = self._pregenerated_data['male_last_names']
        female_first_names = self._pregenerated_data['female_first_names']
        female_last_names = self._pregenerated_data['female_last_names']
        cities = self._pregenerated_data['cities']
        interests = self._pregenerated_data['interests']
        genders = self._pregenerated_data['genders']
        password = self._pregenerated_password
        
        today = date.today()
        min_date = today - timedelta(days=80*365)
        max_date = today - timedelta(days=18*365)
        date_range = (max_date - min_date).days
        
        for _ in range(count):
            birthday = min_date + timedelta(days=random.randint(0, date_range))
            
            # Сначала выбираем пол, затем соответствующие имя и фамилию
            gender = random.choice(genders)
            
            if gender == "male":
                if use_selectivity:
                    first_name = self._get_weighted_value(self.popular_male_names, male_first_names)
                    last_name = self._get_weighted_value(self.popular_male_surnames, male_last_names)
                else:
                    first_name = random.choice(male_first_names)
                    last_name = random.choice(male_last_names)
            else:  # female
                if use_selectivity:
                    first_name = self._get_weighted_value(self.popular_female_names, female_first_names)
                    last_name = self._get_weighted_value(self.popular_female_surnames, female_last_names)
                else:
                    first_name = random.choice(female_first_names)
                    last_name = random.choice(female_last_names)
            
            user_data = {
                "first_name": first_name,
                "last_name": last_name,
                "birthday": birthday,
                "gender": gender,
                "interests": random.choice(interests),
                "city": random.choice(cities),
                "password": password,
            }
            users_data.append(user_data)
        
        return users_data