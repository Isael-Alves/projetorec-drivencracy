import express, { json } from "express";
import cors from "cors";
import homeRoute from './routes/home.Route.js';
import poll from './routes/poll.Route.js';
import choice from './routes/choice.Route.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(homeRoute);
app.use(poll);
app.use(choice);

app.listen(process.env.PORT, () => {
  console.log("Server running oh port " + process.env.PORT);
});
