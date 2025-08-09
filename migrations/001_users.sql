CREATE SCHEMA IF NOT EXISTS otus_hw;

CREATE TABLE IF NOT EXISTS otus_hw.users (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    birthday DATE NOT NULL,
    gender TEXT NOT NULL,
    interests TEXT NOT NULL,
    city TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_names_pattern ON otus_hw.users (first_name text_pattern_ops, last_name text_pattern_ops);