require("dotenv").config();
const {
  engagingUsers,
  popularPosts,
  totalUniquePosts,
  totalUniqueUsers,
  avgPostsPerHour,
  commonHashtags,
  avgVideoLengths,
  avgDescriptionLength,
  postTimes,
  avgUsersPerHour,
  postsByDay,
  usersByDay,
  geoData,
} = require("./models/database");

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const { getAsync, setAsync, expireAsync } = require("./models/redisDriver");
// app.use(express.static(path.join(__dirname, "../frontend")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Allow requests from all for now
    methods: "GET,POST", // Allow GET and POST requests
    optionsSuccessStatus: 200, // Set a 200 status code for successful preflight requests
  })
);

app.get("/engagingUsers", async (req, res) => {
  let results;
  const cacheResults = await getAsync("engagingUsers");

  if (cacheResults !== null) {
    console.log("cacheHit: engagingUsers");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: engagingUsers");
    results = await engagingUsers();
    await setAsync("engagingUsers", JSON.stringify(results));
    // await expireAsync("engagingUsers", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

app.get("/popularPosts", async (req, res) => {
  let results;
  const cacheResults = await getAsync("popularPosts");

  if (cacheResults !== null) {
    console.log("cacheHit: popularPosts");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: popularPosts");
    results = await popularPosts();
    await setAsync("popularPosts", JSON.stringify(results));
    // await expireAsync("popularPosts", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

app.get("/totalUniquePosts", async (req, res) => {
  let results;
  const cacheResults = await getAsync("totalUniquePosts");

  if (cacheResults !== null) {
    console.log("cacheHit: totalUniquePosts");
    results = cacheResults;
  } else {
    console.log("Cache Miss: totalUniquePosts");
    results = await totalUniquePosts();
    await setAsync("totalUniquePosts", results);
    // await expireAsync("totalUniquePosts", parseInt(+new Date() / 1000) + 600);
  }

  res.send(results);
});

app.get("/totalUniqueUsers", async (req, res) => {
  let results;
  let fromCache = false;
  const cacheResults = await getAsync("totalUniqueUsers");

  if (cacheResults !== null) {
    console.log("cacheHit: totalUniqueUsers");
    fromCache = true;
    results = cacheResults;
  } else {
    console.log("Cache Miss: totalUniqueUsers");
    results = await totalUniqueUsers();
    await setAsync("totalUniqueUsers", results);
    // await expireAsync("totalUniqueUsers", parseInt(+new Date() / 1000) + 300);
  }

  res.send(results);
});

app.get("/commonHashtags", async (req, res) => {
  let results;
  const cacheResults = await getAsync("commonHashtags");

  if (cacheResults !== null) {
    console.log("cacheHit: commonHashtags");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: commonHashtags");
    results = await commonHashtags();
    await setAsync("commonHashtags", JSON.stringify(results));
    // await expireAsync("commonHashtags", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

app.get("/avgVideoLengths", async (req, res) => {
  let results;
  const cacheResults = await getAsync("avgVideoLengths");

  if (cacheResults !== null) {
    console.log("cacheHit: avgVideoLengths");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: avgVideoLengths");
    results = await avgVideoLengths();
    await setAsync("avgVideoLengths", JSON.stringify(results));
    // await expireAsync("avgVideoLengths", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

app.get("/avgDescriptionLength", async (req, res) => {
  let results;
  const cacheResults = await getAsync("avgDescriptionLength");

  if (cacheResults !== null) {
    console.log("cacheHit: avgDescriptionLength");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: avgDescriptionLength");
    results = await avgDescriptionLength();
    await setAsync("avgDescriptionLength", JSON.stringify(results));
    // await expireAsync(
    //   "avgDescriptionLength",
    //   parseInt(+new Date() / 1000) + 86400
    // );
  }

  res.send(results);
});

app.get("/postTimes", async (req, res) => {
  let results;
  const cacheResults = await getAsync("postTimes");

  if (cacheResults !== null) {
    console.log("cacheHit: postTimes");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: postTimes");
    results = await postTimes();
    await setAsync("postTimes", JSON.stringify(results));
    // await expireAsync("postTimes", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

app.get("/avgNewPosts", async (req, res) => {
  let results;
  const cacheResults = await getAsync("avgNewPosts");

  if (cacheResults !== null) {
    console.log("cacheHit: avgNewPosts");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: avgNewPosts");
    results = await avgPostsPerHour();
    await setAsync("avgNewPosts", JSON.stringify(results));
    // await expireAsync("avgNewPosts", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

app.get("/avgNewUsers", async (req, res) => {
  let results;
  const cacheResults = await getAsync("avgNewUsers");

  if (cacheResults !== null) {
    console.log("cacheHit: avgNewUsers");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: avgNewUsers");
    results = await avgUsersPerHour();
    await setAsync("avgNewUsers", JSON.stringify(results));
    // await expireAsync("avgNewUsers", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

app.get("/usersByDay", async (req, res) => {
  let results;
  const cacheResults = await getAsync("usersByDay");

  if (cacheResults !== null) {
    results = JSON.parse(cacheResults);
  } else {
    results = await usersByDay();
    await setAsync("usersByDay", JSON.stringify(results));
  }

  res.send(results);
});

app.get("/postsByDay", async (req, res) => {
  let results;
  const cacheResults = await getAsync("postsByDay");

  if (cacheResults !== null) {
    results = JSON.parse(cacheResults);
  } else {
    results = await postsByDay();
    await setAsync("postsByDay", JSON.stringify(results));
  }

  res.send(results);
});

app.get("/geoData", async (req, res) => {
  let results;
  const cacheResults = await getAsync("geoData");

  if (cacheResults !== null) {
    console.log("cacheHit: geoData");
    results = JSON.parse(cacheResults);
  } else {
    console.log("Cache Miss: geoData");
    results = await geoData();
    await setAsync("geoData", JSON.stringify(results));
    // await expireAsync("geoData", parseInt(+new Date() / 1000) + 86400);
  }

  res.send(results);
});

//Route to get users by region, for frontend to make map object of views by region or something similar

app.listen(PORT, process.env.MODE === "PROD" ? "::" : "0.0.0.0", () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
