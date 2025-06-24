#!/bin/bash

echo "=== Тестирование производительности поиска БЕЗ индексов ==="
echo "Используем данные из CSV файла: search_params.csv"

# Создаем директорию для результатов
mkdir -p results/before-index

echo "1. Тест с 1 потоком"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=1 -Jloops=10 \
  -l /results/before-index-1thread.jtl \
  -e -o /results/before-index-1thread-report

echo "2. Тест с 10 потоками"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=10 -Jloops=10 \
  -l /results/before-index-10threads.jtl \
  -e -o /results/before-index-10threads-report

echo "3. Тест с 100 потоками"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=100 -Jloops=5 \
  -l /results/before-index-100threads.jtl \
  -e -o /results/before-index-100threads-report

echo "4. Тест с 1000 потоками"
docker-compose run --rm jmeter -n -t /tests/working-load-test.jmx \
  -Jthreads=1000 -Jloops=2 \
  -l /results/before-index-1000threads.jtl \
  -e -o /results/before-index-1000threads-report

echo "=== Тестирование завершено ==="
echo "Результаты сохранены в results/before-index/"
echo "Теперь выполните add-indexes.sh и затем run-search-after-index.sh" 