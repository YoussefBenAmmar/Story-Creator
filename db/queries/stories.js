const db = require("../connection");

const getStory = () => {
  return db.query("Select * from stories;").then((response) => {
    return response.rows;
  });
};
const getStoryById = (id) => {
  return db
    .query(`select * from stories where name = '${id}'`)
    .then((response) => {
      return response.rows;
    });
};
module.exports = { getStory, getStoryById };
