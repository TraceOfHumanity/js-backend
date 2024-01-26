import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://alex:testAlex@fortestprojectsclaster.tej2sm0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();
app.use(express.json());

app.post("/auth/register", (req, res) => {});

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 4000");
});
