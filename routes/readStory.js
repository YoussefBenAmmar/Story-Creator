const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes, publish } = require ('../db/queries/stories');



router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id :", id);
  res.render(`readStory`);

});



module.exports = router;
