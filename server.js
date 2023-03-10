// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
var path = require("path");
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(
  cookieSession({
    name: "session",
    keys: [
      "purple-tiger-machine-facing-grapefruit-is-impossible-to-be-too-hot-to-handle",
    ],
  })
);

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const widgetApiRoutes = require("./routes/widgets-api");
const storyApiRoutes = require("./routes/stories-api");
const usersRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const readRoutes = require("./routes/readStory");
const readStoriesRouteApi = require("./routes/readStories-api");
const readStoriesContr = require("./routes/readStoryContribution-api");
// const acceptContribution = require("./routes/readStoryContribution-api");

//const registerRoutes = require("./routes/register");
const storyRoutes = require("./routes/story_create_routes");
const storyApi = require("./routes/index-api");
const story = require("./routes/index");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/index/api", storyApi);
app.use("/", story);
app.use("/api/users", userApiRoutes);
app.use("/api/widgets", widgetApiRoutes);
app.use("/api/stories", storyApiRoutes);
app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/readStory", readRoutes);
app.use("/api/readStory", readStoriesRouteApi);
app.use("/api/readStoryContr", readStoriesContr);
// app.use("`/acceptContribution`", acceptContribution);

//app.use("/register", registerRoutes);
app.use("/create", storyRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
