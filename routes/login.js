const express = require("express");
const router = express.Router();
const { getUsers, getUserById } = require('../db/queries/users');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['purple-tiger-machine-facing-grapefruit-is-impossible-to-be-too-hot-to-handle'],
}));

router.get("/", (req, res) => {
  res.render("login");
});


router.post('/', (req, res) => {
  req.session.password =req.body.password;
  req.session.userid = req.body.userid;
  res.redirect('/')
})

// Log out:
router.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});
module.exports = router;
