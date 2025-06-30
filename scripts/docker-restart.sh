#!/bin/bash
# Перезапуск контейнеров Docker
# Используется для быстрого перезапуска контейнеров Docker
# без необходимости перезапуска всей системы
#
# Использование:
# ./docker-restart.sh hot
# ./docker-restart.sh cold
#
# Этот скрипт останавливает все контейнеры Docker, удаляет их и запускает заново
# с использованием docker-compose.

function hot_restart() {
    docker-compose down && docker-compose up -d
}

function full_restart() {
    docker-compose down && docker-compose build && docker-compose up -d
}

echo "Перезапуск контейнеров Docker"
echo "1. Быстрый перезапуск"
echo "2. Перезапуск с перестройкой образов"
echo "3. Выход"
read action

if [ "$action" == "1" ]; then
    hot_restart
elif [ "$action" == "2" ]; then
    full_restart
fi

exit 0