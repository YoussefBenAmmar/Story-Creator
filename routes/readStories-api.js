const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes } = require ('../db/queries/stories');



// router.get("/", (req, res) => {
//   res.render("readStory");
// });

router.get("/", (req, res) => {
  getStories()
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => console.log("getStories ERROR", err))




  // addUpvote()
  //   .then((upVote) => {
  //     res.json(upVote)
  //   })
  //   .catch((err) => console.log("addUpvote ERROR", err))
  });


  module.exports = router;
