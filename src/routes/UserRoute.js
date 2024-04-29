import express from "express";
import UserModel from "../models/user.js";
import { faker } from "@faker-js/faker";
import * as redis from "redis";

const router = express.Router();

router.get("/test", async (request, response) => {
  response.send("okk");
});

const _createRedisClient = async () => {
  const client = await redis.createClient();

  client.on("error", (err) => {
    console.error("Redis connection error:", err);
  });

  return client;
};

router.get("/", async (request, response) => {
  try {
    const redisClient = await _createRedisClient();
    await redisClient.connect();
    //get data from cache-memory
    let redisCache = await redisClient.get(JSON.stringify("my_key"));
    
    // console.log(redisCache);

    if (redisCache !== null) {
      // fetch from redis-cache
      const user_data = JSON.parse(redisCache);
      console.log('from cache');
      return response.json(user_data);
    } else {
      // if cache is null(missing) - Fetch from database

      const user_data = await UserModel.find({});

      // set quiz data in redis cache with unique key
      await redisClient.set(
        JSON.stringify("my_key"),
        JSON.stringify(user_data)
      );
      console.log('from database');
      return response.json(user_data);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (request, response) => {
  // 1 million =  10,00,000
  try {
    const fakeUserRecords = Array.from({ length: 1000000 }, () => ({
      userId: faker.string.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));

    await UserModel.insertMany(fakeUserRecords);
    console.log("data inserted..");
  } catch (err) {
    console.log(err);
  }
});

export default router;
