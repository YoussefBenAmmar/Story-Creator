/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// -------
router.get("/", (req, res) => {
  res.render("register");
});



router.post("/", (req, res) => {
  console.log('________', req.body)
  res.redirect("/")
  return
})

const express = require("express");
const router = express.Router();
const { getUsers, getUserById } = require('../db/queries/users');

const bcrypt = require('bcrypt');


// --------------- Work in progress (13/02)

// router.get("/", (req, res) => {
//   getUsers()
//     .then((users) => {
//       res.send({users});
//     })
//     .catch((err) => console.log("getUsers ERROR", err))
// });

module.exports = router;
