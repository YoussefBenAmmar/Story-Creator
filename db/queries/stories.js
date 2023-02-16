const db = require("../connection");
const express = require("express");
const { response } = require("express");
const router = express.Router();

/**
 * @param {*} getStory
 * @returns A promise to get all the stories
 */

const getStories = () => {
  return db
    .query("SELECT * FROM stories;")
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("getStories ERROR", err));
};

exports.getStories = getStories;

/**
 * @param {*} getStoriesById
 * @returns A promise that returns stories of logged in user
 */
const getStoriesById = (id) => {
  const queryString = `
  SELECT stories.*, users.name, contributions.message,
  contributions.accepted
  FROM stories
 left JOIN users ON users.id = stories.user_id
  left JOIN contributions ON contributions.story_id = stories.id
  WHERE stories.id = $1
  `;
  return db
    .query(queryString, [id])
    .then((res) => {
      return res.rows; //changed here
    })
    .catch((err) => console.log("getStoriesById ERROR", err));
};

exports.getStoriesById = getStoriesById;

/**
 * @param {*} addStory
 * @returns A promise thats allows the user to add a story
 */
const addStory = function (story) {
  const queryString = `
  INSERT INTO stories
    (user_id, body, title,completed)
  VALUES ($1, $2, $3,  FALSE)
  RETURNING *;
  `;

  const values = [story.user_id, story.body, story.title];
  return db
    .query(queryString, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => console.log("addStory ERROR", err));
};

exports.addStory = addStory;

/**
 * @param {*} completedStories
 * @returns Promise switching BOOLEAN to TRUE
 */
const completedStories = (story_id) => {
  const queryString = `UPDATE stories SET published = TRUE WHERE id = $1`;
  return db.query(queryString, [story_id]);
};

/**
 * @param {id} getContributions
 * @returns Promise fetching all contirbutions related to a story
 */
const getContributions = (id) => {
  const queryString = `
    SELECT stories.id, stories.title, stories.body, contributions.message, contributions.accepted,
    contributions.id, users.name, count(upVotes.contribution_id)
    FROM contributions
    JOIN users ON users.id = user_id
    RIGHT JOIN stories ON stories.id=story_id
    FULL OUTER JOIN upVotes ON contributions.id = contribution_id
    WHERE stories.id = $1
    GROUP BY upVotes.contribution_id, stories.id, stories.title, stories.body,
    contributions.message, contributions.accepted, users.name, contributions.id
    ORDER BY contributions.accepted;
  `;

  return db
    .query(queryString, [id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("getContribution ERROR", err));
};

/**
 * @param
 * @returns promise adding contributions
 */
const addContributions = (contributions) => {
  const queryString = `INSERT INTO contributions (story_id, user_id, message, accepted)
  VALUES ($1, $2, $3, null)
  RETURNING *;`;

  const values = [
    contributions.story_id,
    contributions.user_id,
    contributions.message,
  ];

  return db
    .query(queryString, values)
    .then((res) => res.rows[0])
    .catch((err) => console.log("addContributions ERROR", err));
};

const addUpvote = (contribution_id, user_id) => {
  const queryString = `INSERT INTO upVotes (contribution_id, user_id)
  VALUES ($1, $2)
  RETURNING *;`;
  return db.query(queryString, [contribution_id, user_id]);
};

const getUpvotes = (contribution_id) => {
  const queryString = `
  SELECT count(*) FROM upVotes as upVote
  WHERE contribution_id = $1;`;
  return db.query(queryString, [contribution_id]);
};

const publish = (story_id) => {
  const queryString = `UPDATE stories SET completed = TRUE WHERE id = $1;`;
  return db.query(queryString, [story_id]);
};

module.exports = {
  getStories,
  getContributions,
  getStoriesById,
  addStory,
  completedStories,
  addContributions,
  addUpvote,
  getUpvotes,
  publish,
};
