import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://kurayamibackend.onrender.com",
  credentials: true
}));

app.use(express.json());

//import the routes here
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

//route http://localhost:4000/api/v1/users/register

export default app;