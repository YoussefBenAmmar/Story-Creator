DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  -- id SERIAL PRIMARY KEY NOT NULL,
  -- message TEXT NOT NULL,
  -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  -- story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  -- accepted BOOLEAN NOT NULL DEFAULT FALSE,
  -- upvote INTEGER NOT NULL,
  -- downvote INTEGER NOT NULL
  id SERIAL PRIMARY KEY NOT NULL,
  message TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  accepted BOOLEAN,
  upvote INTEGER DEFAULT 0 NOT NULL
);