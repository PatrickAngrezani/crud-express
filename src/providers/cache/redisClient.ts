import { createClient } from "redis";

import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV;

console.log({ env });
const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = process.env.REDIS_PORT || 6379;

const url =
  process.env.NODE_ENV === "development"
    ? "redis://localhost:6379"
    : `redis://${redisHost}:${redisPort}`;
console.log({ host: url });

const redisClient = createClient({
  url,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("redis connected");
})();

export default redisClient;
