const express = require("express");
const router = express.Router();
const storyQueries = require("../db/queries/stories");

router.get("/", (req, res) => {
  storyQueries
    .getStories()
    .then((story) => {
      res.json(story);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
router.post("/", (req, res) => {
  storyQueries
    .getStoriesById(req.body.name)
    .then((story) => {
      res.json(story);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
