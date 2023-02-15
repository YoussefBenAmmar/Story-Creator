const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes, getContributions } = require ('../db/queries/stories');

router.get("/:id", (req, res) => {
  getContributions(req.params.id)
    .then((contributions) => {
      res.json(contributions);
    })
    .catch((err) => console.log("getContributions ERROR", err))
  });

router.get("/", (req, res) => {
  getContributions(2)
    .then((contributions) => {
      res.json(contributions);
    })
    .catch((err) => console.log("getContributions ERROR", err))
  });




  module.exports = router;
