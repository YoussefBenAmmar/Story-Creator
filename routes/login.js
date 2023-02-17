const express = require("express");
const router = express.Router();
const {
  getUserByEmail,
  getUsers,
  getUserById,
} = require("../db/queries/users");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  //console.log(req.body);
  getUserByEmail(req.body.email).then((user) => {
    req.session.user_id = user.id;
    res.redirect("/");
  });
});

// Log out:
router.post("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/login");
});
module.exports = router;
