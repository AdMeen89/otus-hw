# PostgreSQL Master-Slave Репликация

Настройка PostgreSQL с 1 мастером и 2 слейвами для высоконагруженных приложений.

## 🏗️ Архитектура

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  PostgreSQL     │    │  PostgreSQL     │    │  PostgreSQL     │
│  Master         │───▶│  Slave 1        │    │  Slave 2        │
│  :5432          │    │  :5433          │    │  :5434          │
│  (чтение/запись)│    │  (только чтение)│    │  (только чтение)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │    HAProxy      │
                    │  Load Balancer  │
                    │     :5435       │
                    │  (чтение only)  │
                    └─────────────────┘
```

## 🚀 Быстрый старт

### 1. Запуск репликации
```bash
./scripts/replication-setup.sh start
```

### 2. Проверка статуса
```bash
./scripts/replication-setup.sh status
```

### 3. Тестирование репликации
```bash
./scripts/replication-setup.sh test
```

## 📊 Порты доступа

| Сервис | Порт | Назначение | URL |
|--------|------|------------|-----|
| **Master** | 5432 | Чтение/Запись | `localhost:5432` |
| **Slave 1** | 5433 | Только чтение | `localhost:5433` |
| **Slave 2** | 5434 | Только чтение | `localhost:5434` |
| **HAProxy** | 5435 | Балансировка чтения | `localhost:5435` |
| **HAProxy Stats** | 8080 | Мониторинг | http://localhost:8080/stats |
| **Приложение** | 8000 | API | http://localhost:8000 |
| **Grafana** | 3000 | Мониторинг | http://localhost:3000 |

## 🔧 Команды управления

```bash
# Управление репликацией
./scripts/replication-setup.sh start     # Запустить
./scripts/replication-setup.sh stop      # Остановить
./scripts/replication-setup.sh restart   # Перезапустить
./scripts/replication-setup.sh status    # Статус
./scripts/replication-setup.sh test      # Тест репликации

# Просмотр логов
./scripts/replication-setup.sh logs master   # Логи мастера
./scripts/replication-setup.sh logs slave1   # Логи слейва 1
./scripts/replication-setup.sh logs slave2   # Логи слейва 2
./scripts/replication-setup.sh logs haproxy  # Логи HAProxy
./scripts/replication-setup.sh logs app      # Логи приложения
```

## 📝 Использование в приложении

### Подключение к базам данных

```python
# Настройки подключения
DB_MASTER_HOST = "localhost:5432"  # Для записи
DB_SLAVE_HOST = "localhost:5435"   # Для чтения (через HAProxy)

# Или напрямую к слейвам
DB_SLAVE1_HOST = "localhost:5433"  # Слейв 1
DB_SLAVE2_HOST = "localhost:5434"  # Слейв 2
```

### Пример использования
```python
import psycopg2

# Подключение для записи (мастер)
master_conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="otus_hw",
    user="otus_hw",
    password="otus_hw"
)

# Подключение для чтения (слейвы через HAProxy)
slave_conn = psycopg2.connect(
    host="localhost",
    port=5435,
    database="otus_hw",
    user="otus_hw",
    password="otus_hw"
)

# Запись данных (только на мастер)
with master_conn.cursor() as cur:
    cur.execute("INSERT INTO users (name) VALUES (%s)", ("John Doe",))
    master_conn.commit()

# Чтение данных (с слейвов)
with slave_conn.cursor() as cur:
    cur.execute("SELECT * FROM users WHERE name = %s", ("John Doe",))
    result = cur.fetchall()
```

## 🔍 Мониторинг репликации

### Проверка статуса репликации на мастере
```sql
-- Активные репликации
SELECT pid, state, client_addr, sync_state, sync_priority 
FROM pg_stat_replication;

-- Слоты репликации
SELECT slot_name, slot_type, active, restart_lsn, confirmed_flush_lsn
FROM pg_replication_slots;
```

### Проверка лага репликации на слейвах
```sql
-- Статус восстановления
SELECT pg_is_in_recovery();

-- Лаг репликации (на мастере)
SELECT 
    client_addr,
    state,
    pg_wal_lsn_diff(pg_current_wal_lsn(), flush_lsn) AS flush_lag_bytes,
    pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) AS replay_lag_bytes
FROM pg_stat_replication;
```

## ⚖️ HAProxy балансировка

HAProxy распределяет нагрузку чтения между слейвами по алгоритму **round-robin**.

### Статистика HAProxy
- URL: http://localhost:8080/stats
- Показывает состояние каждого слейва
- Количество активных соединений
- Статус health checks

### Конфигурация балансировки
- **Основные серверы**: slave1, slave2
- **Backup сервер**: master (если слейвы недоступны)
- **Health check**: каждые 5 секунд
- **Fallback**: автоматическое переключение на мастер

## 🚨 Мониторинг и алерты

### Grafana Dashboard
- URL: http://localhost:3000
- Логин: `admin` / `admin123`
- Мониторинг производительности БД
- Графики лага репликации

### Ключевые метрики
- Лаг репликации (ms)
- Количество активных соединений
- Производительность запросов
- Использование ресурсов

## 🔧 Конфигурация

### Основные параметры мастера
```sql
wal_level = replica
max_wal_senders = 10
max_replication_slots = 10
hot_standby = on
archive_mode = on
```

### Основные параметры слейвов
```sql
hot_standby = on
max_standby_streaming_delay = 30s
hot_standby_feedback = on
```

## 🚨 Устранение неполадок

### Слейв не подключается к мастеру
```bash
# Проверить логи слейва
./scripts/replication-setup.sh logs slave1

# Проверить сетевое подключение
docker exec postgres-slave1 pg_isready -h postgres-master -p 5432 -U replicator
```

### Большой лаг репликации
```sql
-- На мастере: проверить размер лага
SELECT 
    client_addr,
    pg_wal_lsn_diff(pg_current_wal_lsn(), replay_lsn) / 1024 / 1024 AS lag_mb
FROM pg_stat_replication;
```

### Слейв отстал и не может догнать мастер
```bash
# Пересоздать слейв с нуля
docker-compose -f docker-compose-replication.yml stop postgres-slave1
docker volume rm otus-hw_postgres_slave1_data
docker-compose -f docker-compose-replication.yml up -d postgres-slave1
```

## 📈 Производительность

### Оптимизация для чтения
- Используйте слейвы для всех SELECT запросов
- Балансируйте нагрузку через HAProxy
- Настройте connection pooling

### Оптимизация для записи
- Все INSERT/UPDATE/DELETE только на мастер
- Используйте асинхронную репликацию для производительности
- Настройте checkpoint и WAL параметры

## 🔄 Автоматический failover (будущее развитие)

Для автоматического переключения на слейв при падении мастера рекомендуется использовать:
- **Patroni** + etcd/consul
- **Pgpool-II**
- **Repmgr**

## 📚 Дополнительные ресурсы

- [PostgreSQL Streaming Replication](https://www.postgresql.org/docs/current/warm-standby.html)
- [HAProxy Configuration Manual](https://www.haproxy.org/download/2.6/doc/configuration.txt)
- [PostgreSQL High Availability](https://www.postgresql.org/docs/current/high-availability.html) 