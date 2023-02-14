const db = require("../connection");

const getStory = () => {
  return db.query("Select * from stories;").then((response) => {
    return response.rows;
  });
};
module.exports = { getStory };
