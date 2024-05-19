const redis = require("redis");
const promisify = require("util").promisify;
require("dotenv").config();

let client;

(async () => {
  client = redis.createClient({
    url: `redis://default:Thc!6154@viaduct.proxy.rlwy.net:37277`,
  });

  client.on("error", (err) => console.log(err));
  client.on("connect", () => console.log("Connecting"));
  client.on("reconnecting", () =>
    console.log("Reconnecting to", process.env.REDIS_URL)
  );
  client.on("ready", () => console.log("Ready"));
  client.on("end", () => console.log("Redis connection closed"));
})();

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expireat).bind(client);
module.exports = { getAsync, setAsync, expireAsync };
