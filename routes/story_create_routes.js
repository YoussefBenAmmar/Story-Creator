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
  console.log("this is the story create new contribution part",)
  res.send({});
  // addStory(res).then(res =>{
  //   return res.send(res);
  // });

  // //const obj = {title:"s",body:"someotherstory", id : req.params[0]}
  // //console.log(obj);
  // //console.log(req.params,res.params);
  // //res.send(obj);
  // //req.session.userid
  // res.redirect("/login");

  // if (getStoriesById(req.params[0])){
  //   // add stuffs here as contribution
  //   //addContributions(res);
  //   req.session.userid
  //   res.redirect(`/readStories/${req.params[0]}`)
  // }
  // //other wise just add stories.

})


module.exports = router;