const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes, getContributions } = require ('../db/queries/stories');



// router.get("/", (req, res) => {
//   res.render("readStory");
// });

router.get("/", (req, res) => {
  getContributions(2)
    .then((contributions) => {
      res.json(contributions);
    })
    .catch((err) => console.log("getContributions ERROR", err))



  // addUpvote()
  //   .then((upVote) => {
  //     res.json(upVote)
  //   })
  //   .catch((err) => console.log("addUpvote ERROR", err))
  });


  module.exports = router;
