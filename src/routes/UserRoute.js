import express from "express";
import UserModel from "../models/user.js";
import { faker } from "@faker-js/faker";
import redisConnection from "../helper/redis.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    let redisClient = await redisConnection();
    //get data from cache-memory
    let redisCache = await redisClient.get(JSON.stringify("my_key"));

    if (redisCache !== null) {
      // fetch from redis-cache
      const user_data = JSON.parse(redisCache);

      //From redis cache
      return response.json(user_data);
    } else {
      // if cache is null(missing) - Fetch from database
      const user_data = await UserModel.find({});

      // set quiz data in redis cache with unique key
      await redisClient.set(
        JSON.stringify("my_key"),
        JSON.stringify(user_data)
      );
      
      //From database
      return response.status(200).json({'msg':user_data});
    }
  } catch (error) {    
    response.status(501).json({'msg':err})
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
    
    return response.status(201).json({'msg':'data inserted successfully'})
  } catch (err) {    
    return response.status(501).json({'msg':err});
  }
});

export default router;
