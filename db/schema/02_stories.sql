DROP TABLE IF EXISTS stories CASCADE;
CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,


  title VARCHAR(100),
  body TEXT,
  creation_date TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN DEFAULT FALSE,
  upvotes INTEGER

  -- title VARCHAR(100) NOT NULL,
  -- image_url VARCHAR(255) NOT NULL,
  -- body TEXT,
  -- creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
  -- completion_date TIMESTAMP NOT NULL DEFAULT NULL,
  -- completed BOOLEAN NOT NULL DEFAULT FALSE,
  -- genre VARCHAR(255) NOT NULL,
  -- upvotes INTEGER
)
