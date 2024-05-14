import express from "express";
import "dotenv/config";
import connectionDB from "./config.js";
import UserRoute from "./routes/userRoute.js";

const app = express();

connectionDB();

const PORT = process.env.PORT;

app.use(express.json());
// This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({ extended: true }));

//add routes
app.use("/users", UserRoute);

app.get("/", (req, res) => {
  res.send("working...");
});

app
  .listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
  })
  .on("error", (e) => {
    console.log(e);
  });