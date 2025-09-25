from yoyo import step


steps = [
    step(
        """
        CREATE SCHEMA IF NOT EXISTS otus_hw;
        CREATE TABLE IF NOT EXISTS otus_hw.dialogs (
            id BIGSERIAL PRIMARY KEY,
            pair_key BIGINT NOT NULL,
            from_user INT NOT NULL,
            to_user INT NOT NULL,
            last_message TEXT,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            UNIQUE (from_user, to_user)
        );
        """,
        """
        DROP TABLE IF EXISTS otus_hw.dialogs;
        """,
    )
]



