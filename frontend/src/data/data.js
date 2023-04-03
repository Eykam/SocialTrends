const url = "";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
};

/* JSON Queries*/
export const engagingUsers = async () => {
  var response = await fetch(url + "/engagingUsers", options);
  var body = await response.json();
  return body;
};

export const popularPosts = async () => {
  var response = await fetch(url + "/popularPosts", options);
  var body = await response.json();
  return body;
};

export const commonHashtags = async () => {
  var response = await fetch(url + "/commonHashtags", options);
  var body = await response.json();
  return body;
};

export const postTimes = async () => {
  var response = await fetch(url + "/postTimes", options);
  var body = await response.json();
  return body;
};

export const geoData = async () => {
  var response = await fetch(url + "/geoData", options);
  var body = await response.json();
  return body;
};

/* Metric Queries */
const avgVideoLengths = async () => {
  var response = await fetch(url + "/avgVideoLengths", options);
  var body = await response.json();
  return String(parseInt(body["avg"] / 1000)) + " seconds";
};

const avgDescriptionLength = async () => {
  var response = await fetch(url + "/avgDescriptionLength", options);
  var body = await response.json();
  return String(body["avg"]) + " characters";
};

const totalUniquePosts = async () => {
  var response = await fetch(url + "/totalUniquePosts", options);
  var body = await response.json();
  return body.toLocaleString("en-US");
};

const totalUniqueUsers = async () => {
  var response = await fetch(url + "/totalUniqueUsers", options);
  var body = await response.json();
  return body.toLocaleString("en-US");
};

const avgNewUsers = async () => {
  var response = await fetch(url + "/avgNewUsers", options);
  var body = await response.json();
  return body;
};

const avgNewPosts = async () => {
  var response = await fetch(url + "/avgNewPosts", options);
  var body = await response.json();
  return body;
};

export const metricQueries = {
  totalUniquePosts: { query: totalUniquePosts, subtitle: "Total Posts" },
  totalUniqueUsers: { query: totalUniqueUsers, subtitle: "Total Users" },
  avgVideoLengths: { query: avgVideoLengths, subtitle: "Average Video Length" },
  avgDescriptionLength: {
    query: avgDescriptionLength,
    subtitle: "Average Desc. Length",
  },
  avgNewPosts: { query: avgNewPosts, subtitle: "New Posts per Day" },
  avgNewUsers: { query: avgNewUsers, subtitle: "New Users per Day" },
};
