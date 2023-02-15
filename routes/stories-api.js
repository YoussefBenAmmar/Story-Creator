/*
 * All routes for stories Data are defined here
 * Since this file is loaded in server.js into api/stories,
 *   these routes are mounted onto /api/stories
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const {addStory, getStoriesById} = require("../db/queries/stories")

//This part is for new stories.
router.get('/', (req, res) => {
 const obj = {title:"weeee",body:"pieeeee", id : req.params[0]}
 res.send(obj);
});

router.post("/", (req,res) => {
  addStory(obj);
  res.send({status:true});

})

// This part (with id )is for contribution
router.get('/:id', (req, res) => {  
  const notfuond = false;
  const obj = {title:"weeee",body:"someotherstory", id : req.params[0]}
  if (notfuond){
    res.sendStatus(404);
  }
  res.send(obj);
})

router.post('/:id', (req, res) => {  
  const obj = {title:"s",body:"someotherstory", id : req.params[0]}
  res.send(obj);
})



module.exports = router;
