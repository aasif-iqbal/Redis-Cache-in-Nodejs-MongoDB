import express from "express";
import 'dotenv/config';
import connectionDB from "./config.js";
import UserRoute from "./routes/userRoute.js";
import { faker } from '@faker-js/faker';

process.on('uncaughtException', (e) => {
    console.log('Error',e);
});
                                                                                                                          
  
const app = express();

connectionDB();
//add routes


const PORT = process.env.PORT;

app.use(express.json());
// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({extended:true}));
app.use("/api", UserRoute);

app.get('/', (req, res)=>{
    res.send('working...')
});



app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
}).on('error', (e)=>{
    console.log(e);
});

// export default app;