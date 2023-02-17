const express = require("express");
const router = express.Router();
const {
  getStories,
  getStoriesById,
  addStory,
  completedStories,
  addContributions,
  addUpvote,
  getUpvotes,
  publish,
} = require("../db/queries/stories");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id :", id);
  res.render(`readStory`, { sessionData: req.session.user_id });
});

router.post("/session", (req, res) => {
  console.log("testing");

  const id = req.session.user_id;

  if (id) {
    console.log("id is ", id);
    res.json({ id: id });
  } else {
    res.send(false);
  }
});

module.exports = router;
