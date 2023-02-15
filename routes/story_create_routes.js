const express = require("express");
const router = express.Router();


//this belongs in a render file exmp :pages.js
router.get("/", (req, res) => {
  console.log("hi there");
  res.render("story_create");
});

router.get("/:id", (req, res) => {
  console.log("hi there from story create");
  res.render("story_create");
  
});


module.exports = router;