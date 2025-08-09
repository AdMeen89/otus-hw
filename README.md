# Домашнее задание курса Highload Architect

## Описание проекта

Высоконагруженное веб-приложение с PostgreSQL master-slave репликацией, написанное на Python с использованием FastAPI.

## Технологический стек

- **Python 3.12** + **FastAPI** (асинхронный веб-фреймворк)
- **PostgreSQL 14** кластер под управлением Patroni (HA) + HAProxy endpoints (write/read)
- **Docker** + **Docker Compose** (контейнеризация)
- **Автоматическая балансировка нагрузки** между базами данных
- **Grafana** (мониторинг)

## Установка и запуск

### Предварительные требования
- Docker
- Docker Compose

### 🚀 Запуск (Patroni + HAProxy)

```bash
docker compose -f docker-compose-patroni.yml up -d
```

**Доступные сервисы:**
- **API**: http://localhost:8000
- **Swagger документация**: http://localhost:8000/docs
- **HAProxy write** (master): localhost:5432
- **HAProxy read** (replicas): localhost:5433
- **Grafana мониторинг**: http://localhost:3000

**🤖 Автоматическая балансировка:**
- **SELECT запросы** → распределяются между слейвами (50%/50%)
- **INSERT/UPDATE/DELETE** → выполняются на мастере
- **Транзакции** → выполняются на мастере

## API Endpoints

### 🛠️ Tools
- **`GET /api/v1/tools/health/db`** - Проверка состояния всех баз данных
- **`POST /api/v1/tools/generate-users/{count}`** - Генерация тестовых пользователей

### ⚖️ Load Balancing
Балансировка реализуется на уровне HAProxy. В приложении отдельные эндпоинты статистики удалены.

### 👥 Users
- **`GET /api/v1/users/search`** - Поиск пользователей по имени и фамилии
- **`GET /api/v1/users/{user_id}`** - Получение пользователя по ID
- **`POST /api/v1/users/register`** - Регистрация нового пользователя
- **`POST /api/v1/auth/login`** - Аутентификация пользователя

## Тестирование

### Коллекция Postman
Импортируйте коллекцию: `./docs/Otus_Homework.postman_collection.json`

### Проверка работы
```bash
# Генерируем пользователей (запись через HAProxy write endpoint)
curl -X POST http://localhost:8000/api/v1/tools/generate-users/10

# Поиск пользователей (чтение уйдет на HAProxy read endpoint)
curl "http://localhost:8000/api/v1/user/get/1"
```
