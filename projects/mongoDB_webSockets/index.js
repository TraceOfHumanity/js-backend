import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, (err) => {
      if (err) {
        console.log("Error", err);
      }
      console.log("Server running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("DB error", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});
