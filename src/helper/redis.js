import redis from "redis";

let redisConnection = async function(){
    let redisClient = redis.createClient();
  
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
  
    await redisClient.connect();
    console.log('Redis connected..');
    
    return redisClient;
}
// redisConnection();
export default redisConnection;
