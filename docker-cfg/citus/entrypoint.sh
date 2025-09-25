#!/usr/bin/env bash
set -euo pipefail

# Citus entrypoint script
# Handles coordinator and worker initialization

echo "Starting Citus node: $CITUS_NODE_TYPE"

# Wait for PostgreSQL to be ready
wait_for_postgres() {
    echo "Waiting for PostgreSQL to be ready..."
    until pg_isready -h localhost -p 5432 -U postgres; do
        echo "PostgreSQL is not ready yet..."
        sleep 2
    done
    echo "PostgreSQL is ready!"
}

# Wait for worker to be ready
wait_for_worker() {
    local worker_host=$1
    local worker_port=${2:-5432}
    local max_attempts=30
    local attempt=1
    
    echo "Waiting for worker $worker_host:$worker_port to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if pg_isready -h "$worker_host" -p "$worker_port" -U postgres; then
            echo "Worker $worker_host:$worker_port is ready!"
            return 0
        fi
        echo "Attempt $attempt/$max_attempts: Worker $worker_host:$worker_port not ready yet..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "ERROR: Worker $worker_host:$worker_port failed to become ready after $max_attempts attempts"
    return 1
}

# Initialize coordinator
init_coordinator() {
    echo "Initializing Citus coordinator..."
    
    # Wait for all workers to be ready
    echo "Waiting for all workers to be ready..."
    
    # Normal workers
    wait_for_worker "citus-worker-1" 5432
    wait_for_worker "citus-worker-2" 5432
    wait_for_worker "citus-worker-3" 5432
    
    # Hot workers
    wait_for_worker "citus-worker-hot-1" 5432
    wait_for_worker "citus-worker-hot-2" 5432
    wait_for_worker "citus-worker-hot-3" 5432
    
    # Add workers to coordinator
    echo "Adding workers to coordinator..."
    
    # Normal workers
    psql -h localhost -U postgres -d postgres -c "SELECT citus_add_node('citus-worker-1', 5432);" || echo "Worker 1 already added"
    psql -h localhost -U postgres -d postgres -c "SELECT citus_add_node('citus-worker-2', 5432);" || echo "Worker 2 already added"
    psql -h localhost -U postgres -d postgres -c "SELECT citus_add_node('citus-worker-3', 5432);" || echo "Worker 3 already added"
    
    # Hot workers
    psql -h localhost -U postgres -d postgres -c "SELECT citus_add_node('citus-worker-hot-1', 5432);" || echo "Hot Worker 1 already added"
    psql -h localhost -U postgres -d postgres -c "SELECT citus_add_node('citus-worker-hot-2', 5432);" || echo "Hot Worker 2 already added"
    psql -h localhost -U postgres -d postgres -c "SELECT citus_add_node('citus-worker-hot-3', 5432);" || echo "Hot Worker 3 already added"
    
    echo "All workers added to coordinator"
}

# Initialize worker
init_worker() {
    echo "Initializing Citus worker..."
    # Workers don't need special initialization
    echo "Worker ready"
}

# Start PostgreSQL in background
echo "Starting PostgreSQL..."
docker-entrypoint.sh postgres &
POSTGRES_PID=$!

# Wait for PostgreSQL to be ready
wait_for_postgres

# Initialize Citus after PostgreSQL is ready
case "${CITUS_NODE_TYPE:-worker}" in
    "coordinator")
        init_coordinator
        ;;
    "worker")
        init_worker
        ;;
    *)
        echo "Unknown node type: $CITUS_NODE_TYPE"
        exit 1
        ;;
esac

echo "Citus node initialization complete"

# Wait for PostgreSQL process
wait $POSTGRES_PID
