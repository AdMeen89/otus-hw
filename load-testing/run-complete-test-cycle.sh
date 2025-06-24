#!/bin/bash

# 🎯 Полный цикл тестирования производительности поиска
# Этот скрипт выполняет тестирование ДО и ПОСЛЕ добавления индексов
# с отправкой всех метрик в InfluxDB для визуализации в Grafana

set -e

echo "🚀 ПОЛНЫЙ ЦИКЛ ТЕСТИРОВАНИЯ ПРОИЗВОДИТЕЛЬНОСТИ ПОИСКА"
echo "===================================================="

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для логирования
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] INFO: $1${NC}"
}

# Проверяем доступность системы
check_system() {
    log "🔍 Проверка доступности системы..."
    
    # Проверяем API
    if ! curl -s -f "http://localhost:8000/api/v1/user/search?first_name=Test&last_name=User" > /dev/null; then
        error "API недоступно! Запустите docker-compose up -d"
        exit 1
    fi
    
    # Проверяем InfluxDB
    if ! curl -s -f "http://localhost:8086/ping" > /dev/null; then
        error "InfluxDB недоступна! Проверьте docker-compose"
        exit 1
    fi
    
    # Проверяем Grafana
    if ! curl -s -f "http://localhost:3000" > /dev/null; then
        warn "Grafana недоступна на порту 3000"
    fi
    
    log "✅ Система готова к тестированию"
}

# Функция тестирования
run_test() {
    local test_type=$1
    local threads=$2
    local rampup=$3
    local duration=$4
    
    info "🧪 Запуск теста: $test_type с $threads потоками"
    info "   Ramp-up: ${rampup}s, Duration: ${duration}s"
    
    # Запускаем JMeter с отправкой метрик в InfluxDB
    docker-compose run --rm jmeter \
        -n -t /tests/complete-test.jmx \
        -Jthreads=$threads \
        -Jrampup=$rampup \
        -Jduration=$duration \
        -JtestType=$test_type \
        -l /tests/results/${test_type}-${threads}threads.jtl
    
    if [ $? -eq 0 ]; then
        log "✅ Тест $test_type с $threads потоками завершен успешно"
    else
        warn "⚠️ Тест $test_type с $threads потоками завершен с ошибками"
    fi
    
    sleep 5  # Пауза между тестами
}

# Функция анализа результатов
analyze_results() {
    local test_type=$1
    local threads=$2
    
    local file="results/${test_type}-${threads}threads.jtl"
    
    if [ -f "$file" ] && [ -s "$file" ]; then
        local stats=$(awk -F',' 'NR>1 {
            sum+=$2; count++; 
            if ($4==200) success++; 
            if ($2<min || min=="") min=$2;
            if ($2>max) max=$2;
        } END {
            if (count>0) {
                printf "Запросов: %d, Успешных: %d (%.1f%%), Среднее время: %.1f ms, Min: %.1f ms, Max: %.1f ms", 
                count, success, success/count*100, sum/count, min, max
            } else {
                printf "Нет данных"
            }
        }' "$file")
        
        info "📊 $test_type ($threads потоков): $stats"
    else
        warn "❌ Файл результатов $file не найден или пуст"
    fi
}

# Основная функция
main() {
    log "🎬 Начинаем полный цикл тестирования"
    
    # Проверяем систему
    check_system
    
    # Очищаем базу InfluxDB
    log "🗑️ Очистка базы метрик InfluxDB..."
    curl -X POST 'http://localhost:8086/query' --data-urlencode "q=DROP DATABASE jmeter" 2>/dev/null || true
    curl -X POST 'http://localhost:8086/query' --data-urlencode "q=CREATE DATABASE jmeter" 2>/dev/null || true
    
    log "📋 Начинаем тестирование ДО добавления индексов"
    echo "================================================"
    
    # Удаляем индексы
    log "🗑️ Удаление существующих индексов..."
    ./remove-indexes.sh
    
    # Тесты ДО индексов
    run_test "before-index" 1 5 30
    analyze_results "before-index" 1
    
    run_test "before-index" 10 10 60
    analyze_results "before-index" 10
    
    run_test "before-index" 100 30 60
    analyze_results "before-index" 100
    
    # Для 1000 потоков используем более консервативные настройки
    run_test "before-index" 1000 60 60
    analyze_results "before-index" 1000
    
    log "📋 Начинаем тестирование ПОСЛЕ добавления индексов"
    echo "=================================================="
    
    # Добавляем индексы
    log "🔧 Добавление индексов..."
    ./add-indexes.sh
    
    # Тесты ПОСЛЕ индексов
    run_test "after-index" 1 5 30
    analyze_results "after-index" 1
    
    run_test "after-index" 10 10 60
    analyze_results "after-index" 10
    
    run_test "after-index" 100 30 60
    analyze_results "after-index" 100
    
    run_test "after-index" 1000 60 60
    analyze_results "after-index" 1000
    
    log "🎉 ПОЛНЫЙ ЦИКЛ ТЕСТИРОВАНИЯ ЗАВЕРШЕН!"
    echo "====================================="
    
    # Сводка результатов
    log "📊 СВОДКА РЕЗУЛЬТАТОВ:"
    echo ""
    echo "ДО ИНДЕКСОВ:"
    echo "============"
    for threads in 1 10 100 1000; do
        analyze_results "before-index" $threads
    done
    
    echo ""
    echo "ПОСЛЕ ИНДЕКСОВ:"
    echo "==============="
    for threads in 1 10 100 1000; do
        analyze_results "after-index" $threads
    done
    
    echo ""
    log "📈 Откройте Grafana для просмотра графиков:"
    info "   URL: http://localhost:3000"
    info "   Dashboard: Search API Performance - Complete Analysis"
    info "   Login: admin / admin"
    
    log "📁 Результаты также сохранены в файлы:"
    ls -la results/*.jtl | tail -8
}

# Запускаем главную функцию
main "$@" 