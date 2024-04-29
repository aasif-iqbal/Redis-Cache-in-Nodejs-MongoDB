import express from "express";
import 'dotenv/config';
import connectionDB from "./config.js";
import UserRoute from "./routes/userRoute.js";
import { faker } from '@faker-js/faker';
import * as redis from "redis";

process.on('uncaughtException', (e) => {
    console.log('Error',e);
});


let redisClient;


const app = express();

connectionDB();
//add routes


const PORT = process.env.PORT;

app.use(express.json());
// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended:true}));
app.use("/users", UserRoute);

app.get('/', (req, res)=>{
    res.send('working...')
});


// The "Maximum response size reached" error in Postman 

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
}).on('error', (e)=>{
    console.log(e);
});

(async () => {
    redisClient = redis.createClient();
  
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
  
    await redisClient.connect();
    console.log('Redis connected..');
  })();                                         
    
// export default app;