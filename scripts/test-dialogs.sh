#!/bin/bash

echo "Generating users:\n"

# Generate some users
curl -X 'POST' \
  'http://localhost:8000/api/v1/tools/generate-users/10?use_selectivity=false' \
  -H 'accept: application/json'

# Auth as user 1 and get token
echo "\nAuth as user 1:\n"
TOKEN1=$(curl -s -X 'POST' \
  'http://localhost:8000/api/v1/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "password": "123456"
}' | jq -r '.token')

# Auth as user 2
echo "\nAuth as user 2:\n"
TOKEN2=$(curl -s -X 'POST' \
  'http://localhost:8000/api/v1/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 2,
  "password": "123456"
}' | jq -r '.token')

# Send messages
echo "\nSending message 1\n"
curl -X 'POST' \
  'http://localhost:8081/api/v1/dialog/2/send' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $TOKEN1" \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "тестовое сообщение 1"
}'

echo "\nSending message 2\n"
curl -X 'POST' \
  'http://localhost:8081/api/v1/dialog/1/send' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $TOKEN2" \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "ответное сообщение 2"
}'

# Get dialog
echo "\nGetting dialog between users 1 and 2\n\n"
curl -X 'GET' \
  'http://localhost:8081/api/v1/dialog/2/list' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $TOKEN1"

# Check hot users
echo "\nChecking hot users\n"
curl -X 'GET' \
  'http://localhost:8081/api/v1/admin/hot/users' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $TOKEN1"

# Generate test messages to trigger hot pairs
echo "\nGenerating test messages (high RPS to trigger hot pairs)\n"
curl -X 'POST' \
  'http://localhost:8081/api/v1/tools/messages/create' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "from_user": 1,
  "to_user": 2,
  "count": 20,
  "rps": 10
}'

# Check hot users again
echo "\nChecking hot users after message generation\n"
curl -X 'GET' \
  'http://localhost:8081/api/v1/admin/hot/users' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer $TOKEN1"