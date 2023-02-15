const express = require("express");
const router = express.Router();
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes, publish } = require ('../db/queries/stories');




router.get("/:id", (req, res) => {
  getStories()
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => console.log("getStories ERROR", err))
  });


  router.post("/:id/publish", (req, res) => {
    res.redirect
  })
  // router.post('/:id/published', (req, res) => {
  //   getStories()
  //   .then((stories) => {
  //     res.json(stories);
  //   })
  //   .catch((err) => console.log("getStories ERROR", err))
    // publish(req.params.id)
    //   .then(() => {
    //     res.redirect('/homepage')
    //   })
    //   .catch(err => console.log("publication ERROR", err))
  // });

  module.exports = router;
