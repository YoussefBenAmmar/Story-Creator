const db = require('../connection');
const express = require('express');
const { response } = require('express');
const router  = express.Router();

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(res => {
      return res.rows;
    });
};


const getUserById = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1;", [id])
  .then(res => {
    return res.rows[0]
  })
}

const getUsersStoriesByUserId = (id) => {
  const queryString = `
  SELECT stories.*
  FROM stories
  JOIN users ON users.id = stories.owner_id
  WHERE users.id = $1
  `;

  return db.query(queryString, [id])
    .then((res) => {
      return response.rows;
    });
};

module.exports = { getUsers, getUserById, getUsersStoriesByUserId };
