#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

function print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

function print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

function print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

function print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

function start_replication() {
    print_status "🚀 Запуск PostgreSQL репликации (1 мастер + 2 слейва)..."
    
    # Останавливаем старый compose если он запущен
    docker-compose down 2>/dev/null || true
    
    # Запускаем новую конфигурацию
    docker-compose -f docker-compose-replication.yml up -d
    
    print_status "⏳ Ожидание инициализации серверов..."
    sleep 30
    
    check_replication_status
}

function stop_replication() {
    print_status "🛑 Остановка PostgreSQL репликации..."
    docker-compose -f docker-compose-replication.yml down
    print_success "Репликация остановлена"
}

function check_replication_status() {
    print_status "🔍 Проверка статуса репликации..."
    
    echo
    echo "=== СТАТУС КОНТЕЙНЕРОВ ==="
    docker-compose -f docker-compose-replication.yml ps
    
    echo
    echo "=== ПРОВЕРКА ПОДКЛЮЧЕНИЙ ==="
    
    # Проверка мастера
    print_status "Проверка мастера (порт 5432)..."
    if docker exec postgres-master pg_isready -U otus_hw -d otus_hw >/dev/null 2>&1; then
        print_success "✅ Мастер доступен"
        
        # Проверяем слоты репликации
        echo "Слоты репликации:"
        docker exec postgres-master psql -U otus_hw -d otus_hw -c "SELECT slot_name, slot_type, active, restart_lsn FROM pg_replication_slots;" 2>/dev/null || print_warning "Ошибка получения информации о слотах"
        
        # Проверяем активные репликации
        echo "Активные репликации:"
        docker exec postgres-master psql -U otus_hw -d otus_hw -c "SELECT pid, state, client_addr, sync_state FROM pg_stat_replication;" 2>/dev/null || print_warning "Ошибка получения статуса репликации"
    else
        print_error "❌ Мастер недоступен"
    fi
    
    # Проверка слейва 1
    print_status "Проверка слейва 1 (порт 5433)..."
    if docker exec postgres-slave1 pg_isready -U otus_hw >/dev/null 2>&1; then
        print_success "✅ Слейв 1 доступен"
        
        # Проверяем статус восстановления
        RECOVERY_STATUS=$(docker exec postgres-slave1 psql -U otus_hw -t -c "SELECT pg_is_in_recovery();" 2>/dev/null | xargs)
        if [ "$RECOVERY_STATUS" = "t" ]; then
            print_success "✅ Слейв 1 в режиме recovery (нормально)"
        else
            print_warning "⚠️ Слейв 1 НЕ в режиме recovery"
        fi
    else
        print_error "❌ Слейв 1 недоступен"
    fi
    
    # Проверка слейва 2
    print_status "Проверка слейва 2 (порт 5434)..."
    if docker exec postgres-slave2 pg_isready -U otus_hw >/dev/null 2>&1; then
        print_success "✅ Слейв 2 доступен"
        
        # Проверяем статус восстановления
        RECOVERY_STATUS=$(docker exec postgres-slave2 psql -U otus_hw -t -c "SELECT pg_is_in_recovery();" 2>/dev/null | xargs)
        if [ "$RECOVERY_STATUS" = "t" ]; then
            print_success "✅ Слейв 2 в режиме recovery (нормально)"
        else
            print_warning "⚠️ Слейв 2 НЕ в режиме recovery"
        fi
    else
        print_error "❌ Слейв 2 недоступен"
    fi
    
    # Проверка приложения с ReplicationRoutingDataSource
    print_status "Проверка приложения и роутера баз данных..."
    if curl -s http://localhost:8000/api/v1/tools/health/db >/dev/null 2>&1; then
        print_success "✅ Приложение и роутер доступны"
        
        # Показываем статус health check
        echo "Статус подключений к базам:"
        curl -s http://localhost:8000/api/v1/tools/health/db | jq -r '.databases | to_entries[] | "  \(.key): \(.value.status)"' 2>/dev/null || echo "  (не удалось получить детали)"
    else
        print_error "❌ Приложение недоступно"
    fi
    
    echo
    echo "=== ПОРТЫ ДОСТУПА ==="
    echo "📊 Мастер (запись):     localhost:5432"
    echo "📖 Слейв 1 (чтение):   localhost:5433"
    echo "📖 Слейв 2 (чтение):   localhost:5434"
    echo "🎯 Приложение:         http://localhost:8000"
    echo "🏥 Health Check:       http://localhost:8000/api/v1/tools/health/db"
    echo "📈 Grafana:            http://localhost:3000"
    echo
    echo "🤖 ReplicationRoutingDataSource автоматически направляет:"
    echo "   • SELECT запросы → случайный слейв (с fallback на мастер)"
    echo "   • INSERT/UPDATE/DELETE → мастер"
    echo "   • Транзакции → мастер"
}

function test_replication() {
    print_status "🧪 Тестирование репликации..."
    
    # Создаем тестовую таблицу на мастере
    print_status "Создание тестовых данных на мастере..."
    docker exec postgres-master psql -U otus_hw -d otus_hw -c "
        DROP TABLE IF EXISTS replication_test;
        CREATE TABLE replication_test (
            id SERIAL PRIMARY KEY,
            message TEXT,
            created_at TIMESTAMP DEFAULT NOW()
        );
        INSERT INTO replication_test (message) VALUES 
            ('Test message 1'),
            ('Test message 2'),
            ('Test message 3');
    " 2>/dev/null
    
    sleep 2
    
    # Проверяем данные на слейвах
    print_status "Проверка данных на слейвах..."
    
    SLAVE1_COUNT=$(docker exec postgres-slave1 psql -U otus_hw -t -c "SELECT COUNT(*) FROM replication_test;" 2>/dev/null | xargs)
    SLAVE2_COUNT=$(docker exec postgres-slave2 psql -U otus_hw -t -c "SELECT COUNT(*) FROM replication_test;" 2>/dev/null | xargs)
    
    if [ "$SLAVE1_COUNT" = "3" ]; then
        print_success "✅ Слейв 1: данные реплицированы ($SLAVE1_COUNT записей)"
    else
        print_error "❌ Слейв 1: данные НЕ реплицированы ($SLAVE1_COUNT записей)"
    fi
    
    if [ "$SLAVE2_COUNT" = "3" ]; then
        print_success "✅ Слейв 2: данные реплицированы ($SLAVE2_COUNT записей)"
    else
        print_error "❌ Слейв 2: данные НЕ реплицированы ($SLAVE2_COUNT записей)"
    fi
    
    # Очищаем тестовые данные
    docker exec postgres-master psql -U otus_hw -d otus_hw -c "DROP TABLE replication_test;" 2>/dev/null
    
    print_success "Тест репликации завершен"
}

function show_logs() {
    local service=$1
    if [ -z "$service" ]; then
        echo "Доступные сервисы:"
        echo "  master, slave1, slave2, app, grafana"
        echo "Использование: $0 logs <service>"
        return
    fi
    
    case $service in
        master)
            docker-compose -f docker-compose-replication.yml logs -f postgres-master
            ;;
        slave1)
            docker-compose -f docker-compose-replication.yml logs -f postgres-slave1
            ;;
        slave2)
            docker-compose -f docker-compose-replication.yml logs -f postgres-slave2
            ;;
        app)
            docker-compose -f docker-compose-replication.yml logs -f app
            ;;
        grafana)
            docker-compose -f docker-compose-replication.yml logs -f grafana
            ;;
        *)
            print_error "Неизвестный сервис: $service"
            ;;
    esac
}

# Основное меню
case "${1:-}" in
    start)
        start_replication
        ;;
    stop)
        stop_replication
        ;;
    status)
        check_replication_status
        ;;
    test)
        test_replication
        ;;
    logs)
        show_logs $2
        ;;
    restart)
        stop_replication
        sleep 5
        start_replication
        ;;
    *)
        echo "🐘 PostgreSQL Replication Manager"
        echo
        echo "Использование: $0 {start|stop|status|test|logs|restart}"
        echo
        echo "Команды:"
        echo "  start    - Запустить репликацию (1 мастер + 2 слейва)"
        echo "  stop     - Остановить все сервисы"
        echo "  status   - Проверить статус репликации"
        echo "  test     - Протестировать репликацию данных"
        echo "  logs     - Показать логи сервиса"
        echo "  restart  - Перезапустить все сервисы"
        echo
        echo "Примеры:"
        echo "  $0 start"
        echo "  $0 status"
        echo "  $0 logs master"
        echo "  $0 test"
        exit 1
        ;;
esac 