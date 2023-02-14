const express = require("express");
const router = express.Router();
const storyQueries = require("../db/queries/stories");

router.get("/", (req, res) => {
  // storyQueries
  //   .getStory()
  //   .then((story) => {
  // res.json({ story });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });
  res.render("index")

});

module.exports = router;
