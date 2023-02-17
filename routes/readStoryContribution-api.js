const express = require("express");
const router = express.Router();
const {
  getStories,
  getStoriesById,
  addStory,
  completedStories,
  addContributions,
  addUpvote,
  getUpvotes,
  getContributions,
  publish,
  acceptContribution,
} = require("../db/queries/stories");

router.get("/:id", (req, res) => {
  getContributions(req.params.id)
    .then((contributions) => {
      res.json(contributions);
    })
    .catch((err) => console.log("getContributions ERROR", err));
});

router.get("/", (req, res) => {
  getContributions(2)
    .then((contributions) => {
      res.json(contributions);
    })
    .catch((err) => console.log("getContributions ERROR", err));
});

router.post("/:id/upvote", (req, res) => {
  // addUpvote (req.params.id, req.session.user_id)
  addUpvote(req.params.id, 2)
    .then((vote) => {
      res.json(vote);
    })
    .catch((err) => console.log("addUpvote ERROR", err));
});

router.get("/:id/upvote", (req, res) => {
  getUpvotes(req.params.id)
    .then((vote) => {
      res.json(vote);
    })
    .catch((err) => console.log("getUpvotes ERROR", err));
});

router.post("/acceptContribution/:id", (req, res) => {
  acceptContribution(req.params.id)
    .then((accept) => {
      res.json(accept);
    })
    .catch((err) => {
      console.log("acceptContr ERRROR", err);
    });
});
module.exports = router;
