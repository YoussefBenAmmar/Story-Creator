CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(100) NOT NULL,
  thumbnail_photo_url VARCHAR(255) NOT NULL,
  body TEXT,
  creation_date DATE NOT NULL,
  completion_date DATE NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  genre VARCHAR(255) NO NULL
)
