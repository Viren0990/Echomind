import redis from "@/lib/redis";

async function testRedis() {
  // Set a value
  await redis.set("greeting", "Hello from Redis!", "EX", 60); // expires in 60 sec

  // Get the value
  const value = await redis.get("greeting");
  console.log("Redis value:", value);
}

export default function page(){
    testRedis();
    return(<div>

    </div>)
}