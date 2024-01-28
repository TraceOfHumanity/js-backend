import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "./controllers/postController.js";
import { login, meInfo, register } from "./controllers/userController.js";
import checkAuth from "./utils/checkAuth.js";
import { loginValidation, registerValidation } from "./validations/auth.js";
import { postCreateValidation } from "./validations/post.js";

const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

app.get("/", (req, res) => {
  res.send("server is running");
});

app.post("/auth/register", registerValidation, register);
app.post("/auth/login", loginValidation, login);
app.get("/auth/meInfo", checkAuth, meInfo);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostById);
app.post("/posts", checkAuth, postCreateValidation, createPost);
app.patch("/posts/:id", checkAuth, updatePost);
app.delete("/posts/:id", checkAuth, deletePost);

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 4000");
});
