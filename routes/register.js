const express = require("express");
const router = express.Router();
const PORT = 8080; // default port 8080
const bcrypt = require("bcryptjs");
const password = "purple-monkey-dinosaur"; // found in the req.body object
const hashedPassword = bcrypt.hashSync(password, 10);
const { lookupUsersEmail, urlsForUser, generateRandomString } = require('./helpers');
const usersDb = require ('../db/schema/users')



//  Register new users into db



const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'youssefbenammar',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// the following assumes that you named your connection variable `pool`
pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => { });



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const strQuery = ` SELECT *
  FROM users
  WHERE users.email = $1`;
  return pool
    .query(strQuery, [email])
    .then(res => {
      if(res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch (err => {
      console.log('error', err);
    });

};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const strQuery =  `
  SELECT * FROM users
  WHERE users.id = $1
  `;

  return pool
    .query(strQuery,  [id])
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log('error', err);
    });
  // return Promise.resolve(users[id]);
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const strQuery = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `;

  const vals = [user.name, user.email, user.password];

  return pool
    .query(strQuery, vals)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return ('error', err);
    });

};
exports.addUser = addUser;


router.get("/", (req, res) => {
  res.render("register");
});

// router.get("/register", (req, res) => {
//   if (req.session.user_ID) {
//     res.redirect('/');
//     return;
//   }

//   const id = req.session.user_ID;
//   const templateVars = { urls: urlDatabase[id], user: users[id] };
//   res.render("registration", templateVars);
// });




// router.post("/register", (req, res) => {

//   if (!req.body.email) {
//     res.status(400);
//     res.send('None shall pass');
//   }

//   if (!lookupUsersEmail(req.body.email, users)) {
//     const id = generateRandomString();
//     users[id] = {
//       id,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password, 10)
//     };
//     req.session.user_ID = id;
//     res.redirect("/urls");
//     return;
//   } else {
//     res.status(400);
//     res.send("Email already exists");
//     return;
//   }

// });

module.exports = router;
