const redis = require("redis");
const promisify = require("util").promisify;
require("dotenv").config();

let client;

(async () => {
  client = redis.createClient({
    url: `redis://${process.env.REDIS_URL}:6379`,
  });

  client.on("error", (err) => console.log(err));
  client.on("connect", () => console.log("Connecting"));
  client.on("reconnecting", () => console.log("Reconnecting"));
  client.on("ready", () => console.log("Ready"));
  client.on("end", () => console.log("Redis connection closed"));
})();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expireat).bind(client);
module.exports = { getAsync, setAsync, expireAsync };
