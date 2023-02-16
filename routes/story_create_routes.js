const express = require("express");
const db = require("../db/connection");
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
const router = express.Router();

//user lands here for a new story
router.get("/", (req, res) => {
  console.log("hi there");
  res.render("story_create");
});

//user lands here for a oldstory
router.get("/:id", (req, res) => {
  console.log("hi there from story create");
  res.render("contribution_create", { id: req.params.id });
});

//this part is for posting database to the table...
router.post("/:id", (req, res) => {
  console.log("this is the story create story");
  addStory(res).then((datadone) => {
    res.send({ storyid: req.params.id });
  });
});

router.post("/contribute/:id", (req, res) => {
  console.log(req.body, req.session);
  console.log("this is the story create new contribution part");
  const contribution = {
    user_id: req.session.user_id,
    message: req.body.body,
    story_id: req.params.id,
  };
  addContributions(contribution).then((datadone) => {
    res.redirect(`/readStory/${req.params.id}`);
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.session);
  const story = {
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  };
  console.log("this is the story create story without id");
  addStory(story).then((data) => {
    // res.send({ storyid: data.user_id });
    res.redirect(`/readStory/${data.id}`);
  });
});

module.exports = router;
