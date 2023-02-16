const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes, publish } = require ('../db/queries/stories');




router.get("/:id", (req, res) => {
  getStoriesById(req.params.id)
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => console.log("getStories ERROR", err))
  });

  router.post("/create/:id", (req, res) => {
    res.redirect(`/create/${req.params.id}`);
  })

  router.post("/:id/publish", (req, res) => {
    res.redirect
  })


  module.exports = router;
