FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive \
    LC_ALL=C.UTF-8 \
    LANG=C.UTF-8 \
    PATRONI_VERSION=3.2.2

RUN apt-get update && apt-get install -y --no-install-recommends \
    gnupg \
    wget \
    curl \
    ca-certificates \
    locales \
    python3 \
    python3-pip \
    python3-venv \
    build-essential \
    libpq-dev \
    gosu \
    && rm -rf /var/lib/apt/lists/*

# Install PostgreSQL 14 from PGDG
RUN echo "deb http://apt.postgresql.org/pub/repos/apt bookworm-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /etc/apt/keyrings/postgresql.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt bookworm-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends postgresql-14 postgresql-contrib-14 \
    && rm -rf /var/lib/apt/lists/*

# Install Patroni with etcd3 support
# Ensure Postgres binaries are in PATH
ENV PATH="/usr/lib/postgresql/14/bin:${PATH}"

# Create virtualenv for Patroni to avoid PEP 668 restriction
RUN python3 -m venv /opt/patroni-venv \
    && /opt/patroni-venv/bin/pip install --no-cache-dir --upgrade pip \
    && /opt/patroni-venv/bin/pip install --no-cache-dir "patroni[etcd3]==${PATRONI_VERSION}" psycopg2-binary

# Prepare directories
RUN mkdir -p /etc/patroni /var/lib/postgresql/data \
    && chown -R postgres:postgres /var/lib/postgresql

COPY patroni.yml /etc/patroni/patroni.yml
COPY start.sh /usr/local/bin/start-patroni
RUN chmod +x /usr/local/bin/start-patroni

EXPOSE 5432 8008

ENTRYPOINT ["/usr/local/bin/start-patroni"]

