/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
 console.log("test");
 res.send({status:true});
});

router.post("/", (req,res) => {
  const title = req.body.title;
  const story = req.body.story;
  const obj = {title,story}
  console.log(req.body);
  //addStory(obj);
  res.send({status:true});

})

module.exports = router;
