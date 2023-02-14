const db = require('../connection');
const express = require('express');
const { response } = require('express');
const router  = express.Router();


/**
 * @param {*} getStory
 * @returns A promise to get all the stories
 */

const getStories = () => {
  return db.query("SELECT * FROM stories;")
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log("getStories ERROR", err));
}


/**
 * @param {*} getStoriesById
 * @returns A promise that returns stories of logged in user
 */
const getStoriesById = (id) => {
  const queryString = `
  SELECT stories.*, users.name, contributions.message,
  contributions.accepted
  FROM stories
  JOIN users ON users.id = stories.owner_id
  JOIN contributions ON contributions.id = story_id
  WHERE stories.id = $1
  `

  return db.query(queryString, [id])
  .then((res) => {
    return res.rows[0];
  })
  .catch((err) => console.log("getStoriesById ERROR", err));
}


/**
 * @param {*} addStory
 * @returns A promise thats allows the user to add a story
 */
const addStory = function (story) {
  const queryString = `
  INSERT INTO stories
    (owner_id, body, title, image_url, creation_date, completed, complition_date)
  VALUES ($1, $2, $3, $4, NOW(), FALSE, NULL)
  RETURNING *;
  `;

  const values = [story.owner_id, story.body, story.title, story.image_url]
  return db.query(queryString, values)
    .then(res => {
      return res.rows[0];
    })
    .catch((err) => console.log("addStory ERROR", err));
}

/**
 * @param {*} completedStories
 * @returns Promise switching BOOLEAN to TRUE
 */
const completedStories = (story_id) => {
  const queryString = `UPDATE stories SET published = TRUE WHERE id = $1`
  return db.query(queryString, [story_id])
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
    JOIN users ON users.id = contributor_id
    RIGHT JOIN stories ON stories.id=story_id
    FULL OUTER JOIN upVotes ON contributions.id = contribution_id
    WHERE stories.id = $1
    GROUP BY upVotes.contribution_id, stories.id, stories.title, stories.body,
    contributions.message, contributions.accepted, users.name, contributions.id
    ORDER BY contributions.accepted;
  `

  return db.query(queryString, [id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => console.log('getContribution ERROR', err))
};

/**
 * @param
 * @returns promise adding contributions
 */
const addContributions = (contributions) => {
  const queryString = `INSERT INTO contributions (story_id, user_id, message, accepted)
  VALUES ($1, $2, $3, NULL)
  RETURNING *;`

  const values = [contributions.story_id, contributions.user_id, contributions.message];

  return db.query(queryString, values)
    .then(res => res.rows[0])
    .catch((err) => console.log('addContributions ERROR', err));
};

const addUpvote = () => {};

const getUpvotes = () => {};

const getIncompleteStories = () => {};

