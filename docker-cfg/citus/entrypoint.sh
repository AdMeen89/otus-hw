#!/usr/bin/env bash
set -euo pipefail

echo "Starting Citus node: ${CITUS_NODE_TYPE:-worker}"

# -----------------------------
# helpers
# -----------------------------
wait_for_postgres() {
  echo "Waiting for local PostgreSQL..."
  until pg_isready -h localhost -p 5432 -U postgres >/dev/null 2>&1; do
    sleep 2
  done
  echo "PostgreSQL is ready."
}

wait_for_worker() {
  local host=$1 port=${2:-5432} tries=${3:-30} i=1
  echo "Waiting for ${host}:${port}..."
  while [ $i -le $tries ]; do
    if pg_isready -h "$host" -p "$port" -U postgres >/dev/null 2>&1; then
      echo "${host}:${port} is ready."
      return 0
    fi
    echo "  attempt $i/$tries..."
    sleep 2
    i=$((i+1))
  done
  echo "WARN: ${host}:${port} did not become ready in time."
  return 1
}

psqlq() { psql -h localhost -U postgres -d postgres -q -t -A -c "$1" || true; }

# -----------------------------
# start postgres with proper args
# -----------------------------
echo "Starting PostgreSQL..."

# Если аргументы не переданы через `command:` — задаём дефолт с нужными -c
if [ $# -eq 0 ]; then
  set -- postgres \
    -c wal_level=logical \
    -c max_replication_slots=128 \
    -c max_wal_senders=16 \
    -c max_worker_processes=32 \
    -c max_logical_replication_workers=16 \
    -c max_parallel_workers=16 \
    -c citus.enable_schema_propagation=off
fi

echo "PostgreSQL start args: $*"
docker-entrypoint.sh "$@" &
POSTGRES_PID=$!

wait_for_postgres

# sanity: wal_level must be logical
WAL=$(psql -h localhost -U postgres -d postgres -tAc "SHOW wal_level")
echo "wal_level: ${WAL}"
if [ "$WAL" != "logical" ]; then
  echo "FATAL: wal_level != logical"; kill "$POSTGRES_PID" || true; wait "$POSTGRES_PID" || true; exit 1
fi

# -----------------------------
# ensure Citus extension on EVERY node
# -----------------------------
echo "Ensuring CREATE EXTENSION citus ..."
psqlq "CREATE EXTENSION IF NOT EXISTS citus;"
# (опционально) проверка
psqlq "SELECT citus_installation_is_valid();"

# -----------------------------
# role-specific init
# -----------------------------
init_coordinator() {
  echo "Coordinator init..."

  # подождать воркеров (добавь сюда имена, если расширишь кластер)
  wait_for_worker "citus-worker-1" 5432 || true
  wait_for_worker "citus-worker-2" 5432 || true
  wait_for_worker "citus-worker-3" 5432 || true

  # теперь можно настраивать citus.* (расширение уже загружено)
  echo "Set Citus cluster defaults (RF=1, disable local exec, disable schema propagation)..."
  psqlq "ALTER SYSTEM SET citus.shard_replication_factor = 1;"
  psqlq "ALTER SYSTEM SET citus.enable_local_execution   = off;"
  psqlq "ALTER SYSTEM SET citus.enable_schema_propagation = off;"
  psqlq "SELECT pg_reload_conf();"

  echo "Set coordinator hostname..."
  psqlq "SELECT citus_set_coordinator_host('citus-coordinator');"

  echo "Adding workers (idempotent)..."
  psql -h localhost -U postgres -d postgres <<'SQL'
-- добавляем ноду только если её ещё нет в pg_dist_node
SELECT citus_add_node('citus-worker-1', 5432)
WHERE NOT EXISTS (SELECT 1 FROM pg_dist_node WHERE nodename='citus-worker-1' AND nodeport=5432);

SELECT citus_add_node('citus-worker-2', 5432)
WHERE NOT EXISTS (SELECT 1 FROM pg_dist_node WHERE nodename='citus-worker-2' AND nodeport=5432);

SELECT citus_add_node('citus-worker-3', 5432)
WHERE NOT EXISTS (SELECT 1 FROM pg_dist_node WHERE nodename='citus-worker-3' AND nodeport=5432);
SQL

  echo "Coordinator init done."
}

init_worker() {
  echo "Worker init..."
  # На воркере расширение уже создано выше (CREATE EXTENSION ...).
  # Можешь здесь выключить propagation ещё раз через ALTER SYSTEM — но мы уже
  # передали -c citus.enable_schema_propagation=off при старте postmaster.
  echo "Worker init done."
}

case "${CITUS_NODE_TYPE:-worker}" in
  coordinator) init_coordinator ;;
  worker)      init_worker ;;
  *) echo "Unknown CITUS_NODE_TYPE='${CITUS_NODE_TYPE:-}'"; kill "$POSTGRES_PID" || true; wait "$POSTGRES_PID" || true; exit 1 ;;
esac

echo "Citus node initialization complete."
wait "$POSTGRES_PID"