#!/bin/bash

echo "🚀 Запуск нагрузочного тестирования с JMeter и Grafana"
echo "=================================================="

# Создаем папку для результатов если её нет
mkdir -p results

# Запускаем инфраструктуру (приложение, база данных, InfluxDB, Grafana)
echo "📦 Запуск инфраструктуры..."
docker-compose up -d app db influxdb grafana

# Ждем пока все сервисы поднимутся
echo "⏳ Ожидание запуска сервисов..."
sleep 30

# Проверяем доступность сервисов
echo "🔍 Проверка доступности сервисов..."

# Проверяем приложение
if curl -f http://localhost:8000/docs > /dev/null 2>&1; then
    echo "✅ Приложение доступно на http://localhost:8000"
else
    echo "❌ Приложение недоступно"
    exit 1
fi

# Проверяем Grafana
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Grafana доступна на http://localhost:3000"
else
    echo "❌ Grafana недоступна"
    exit 1
fi

# Проверяем InfluxDB
if curl -f http://localhost:8086/ping > /dev/null 2>&1; then
    echo "✅ InfluxDB доступна на http://localhost:8086"
else
    echo "❌ InfluxDB недоступна"
    exit 1
fi

echo ""
echo "🎯 Все сервисы готовы к работе!"
echo ""
echo "📊 Доступные интерфейсы:"
echo "   • Приложение: http://localhost:8000"
echo "   • Swagger UI: http://localhost:8000/docs"
echo "   • Grafana:    http://localhost:3000 (admin/admin123)"
echo ""

# Запускаем JMeter тест
echo "🧪 Запуск нагрузочного тестирования..."
docker-compose --profile testing run --rm jmeter

echo ""
echo "📈 Результаты тестирования сохранены в папке load-testing/results/"
echo "📊 Просмотрите результаты в Grafana: http://localhost:3000"
echo ""
echo "⚠️  Для остановки всех сервисов выполните: docker-compose down" 