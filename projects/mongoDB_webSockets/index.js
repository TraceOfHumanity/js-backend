import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    console.log("Error", err);
  }
  console.log("Server running on port", process.env.PORT);
});
