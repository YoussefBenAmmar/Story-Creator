CREATE TABLE upVotes (
  id SERIAL PRIMARY KEY NOT NULL,
  contribution_id INTEGER REFERENCES contributions(id) NOT NULL,
  name_id INTEGER REFERENCES users(id) NOT NULL
);
