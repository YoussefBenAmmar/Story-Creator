const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes } = require ('../db/queries/stories');




router.get("/:id", (req, res) => {
  getStories()
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => console.log("getStories ERROR", err))
  });


  module.exports = router;
