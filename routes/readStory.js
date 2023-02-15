const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes } = require ('../db/queries/stories');



router.get("/", (req, res) => {
  res.render("readStory");
});

// router.get("/", (req, res) => {
//   getStories()
//     .then((stories) => {
//       // const templateVars = { stories: stories, user: req.session.user_id };
//       res.json(stories[0].body);
//     })
//     .catch((err) => console.log("getStories ERROR", err))

//   });


router.post("/", (req, res) => {
  console.log('________', req.body)

  addUpvote(req.session.user_id)

  res.redirect("/")
  return
})



module.exports = router;
