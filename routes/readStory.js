const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes, publish } = require ('../db/queries/stories');



router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id :", id);
  res.render("readStory");

});

router.get("/:id/published", (req, res) => {
  const id = req.params.id;
  console.log("id :", id);
  res.render("readStory");

});



// router.post("/", (req, res) => {
//   console.log('________', req.body)


//   res.redirect("/")
//   return
// })



module.exports = router;
