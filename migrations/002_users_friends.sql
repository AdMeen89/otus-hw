CREATE TABLE otus_hw.users_friends (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, friend_id)
);

CREATE INDEX idx_users_friends_user_id ON otus_hw.users_friends (user_id);
CREATE INDEX idx_users_friends_friend_id ON otus_hw.users_friends (friend_id);


