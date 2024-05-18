const url = "/api";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

/* JSON Queries*/
export const engagingUsers = async () => {
  const response = await fetch(url + "/engagingUsers", options);
  const body = await response.json();
  return body;
};

export const popularPosts = async () => {
  const response = await fetch(url + "/popularPosts", options);
  const body = await response.json();
  return body;
};

export const commonHashtags = async () => {
  const response = await fetch(url + "/commonHashtags", options);
  const body = await response.json();
  return body;
};

export const postTimes = async () => {
  const response = await fetch(url + "/postTimes", options);
  const body = await response.json();
  return body;
};

export const geoData = async () => {
  const response = await fetch(url + "/geoData", options);
  const body = await response.json();
  return body;
};

/* Metric Queries */
const avgVideoLengths = async () => {
  const response = await fetch(url + "/avgVideoLengths", options);
  const body = await response.json();
  return String(parseInt(body["avg"] / 1000)) + " seconds";
};

const avgDescriptionLength = async () => {
  const response = await fetch(url + "/avgDescriptionLength", options);
  const body = await response.json();
  return String(body["avg"]) + " characters";
};

const totalUniquePosts = async () => {
  const response = await fetch(url + "/totalUniquePosts", options);
  const body = await response.json();
  return body.toLocaleString("en-US");
};

const totalUniqueUsers = async () => {
  const response = await fetch(url + "/totalUniqueUsers", options);
  const body = await response.json();
  return body.toLocaleString("en-US");
};

const avgNewUsers = async () => {
  const response = await fetch(url + "/avgNewUsers", options);
  const body = await response.json();
  return body;
};

const avgNewPosts = async () => {
  const response = await fetch(url + "/avgNewPosts", options);
  const body = await response.json();
  return body;
};

const postsByDay = async () => {
  const response = await fetch(url + "/postsByDay", options);
  const body = await response.json();
  return body;
};

const usersByDay = async () => {
  const response = await fetch(url + "/usersByDay", options);
  const body = await response.json();
  return body;
};

export const metricQueries = {
  totalUniquePosts: { query: totalUniquePosts, subtitle: "Total Unique Posts" },
  totalUniqueUsers: { query: totalUniqueUsers, subtitle: "Total Unique Users" },
  avgVideoLengths: { query: avgVideoLengths, subtitle: "Average Video Length" },
  avgDescriptionLength: {
    query: avgDescriptionLength,
    subtitle: "Average Desc. Length",
  },
  avgNewPosts: {
    query: avgNewPosts,
    subtitle: "Average Posts Scraped (Hourly)",
  },
  avgNewUsers: {
    query: avgNewUsers,
    subtitle: "Average Users Scraped (Hourly)",
  },
  usersByDay: {
    query: usersByDay,
    subtitle: "New Users By Day",
  },
  postsByDay: {
    query: postsByDay,
    subtitle: "New Posts By Day",
  },
};
