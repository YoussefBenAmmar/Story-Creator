const express = require("express");
const router = express.Router();
const client = require('../db/connection');

const generateRandomString = function () {
  let result = [];
  let charas = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = 0 ; i < 6; i++) {
    let rand = Math.floor(Math.random() * (charas.length - 1) + 1);
    result.push(charas[rand]);
  }
  return result.join('');
}

router.post("/read", (req, res) => {
  //res.render("story_create");
  return res.redirect("/login");
});

router.get("/", (req, res) => {
  res.render("story_create");
  let id = generateRandomString();
  res.redirect(`/${id}`);
});

router.get("/:id",(req, res) => {
  res.render("story_create");
  //views_manager.show("create");
});

router.post("/:id/create", (req,res) => {

})



module.exports = router;