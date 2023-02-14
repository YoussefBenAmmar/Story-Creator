const db = require('../connection');

const createStory = (title,body) => {
  const queryString = `INSERT INTO Story ( title, body)
  VALUES($1,$2)`
  return db.query(queryString,[title,body])
    .then(data => {
      return data.rows;
    });
};

const insertStory = (id,body) => {
  const queryString = `INSERT INTO Story ( title, body)
  VALUES($1,$2)`
  return db.query(queryString,[id,body])
    .then(data => {
      return data.rows;
    });
};

