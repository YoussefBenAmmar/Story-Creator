const express = require("express");
const db = require("../db/connection");
const { getStories, getStoriesById, addStory, completedStories, addContributions, addUpvote, getUpvotes, publish } = require ('../db/queries/stories');
const router = express.Router();


//user lands here for a new story
router.get("/", (req, res) => {
  console.log("hi there");
  res.render("story_create");
});

//user lands here for a oldstory
router.get("/:id", (req, res) => {
  console.log("hi there from story create");
  res.render("story_create");

});

//this part is for posting database to the table...
router.post('/:id', (req, res) => {  
  console.log("this is the story create story",)
  addStory(res).then(
    datadone => { 
      res.send({storyid:req.params.id})
    }
  )
})

router.post('/', (req, res) => {  
  console.log("this is the story create story without id",)
  addStory(databack).then(
    datadone => { 
      res.send({storyid:databack.user_id})
    }
  )
})


router.post('/contribute/:id', (req, res) => {  
  console.log("this is the story create new contribution part",)
  addContributions(res).then(
    datadone => { 
      res.send({storyid:req.params.id})
    }
  )
})


module.exports = router;