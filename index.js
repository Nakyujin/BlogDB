import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js"

const app = express();

app.use(cors());

app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
    res.json("hello this is the backend");
});

app.listen(8800, () => {
    console.log("connected!");
});
