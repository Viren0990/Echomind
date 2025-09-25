import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",  // Memurai default host
  port: 6379,         // Memurai default port
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis error:", err);
});

export default redis;
