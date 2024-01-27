import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import UserSchema from "./models/user.js";
import checkAuth from "./utils/checkAuth.js";
import { registerValidation } from "./validations/auth.js";

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

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserSchema({
      email: req.body.email,
      passwordHash: hash,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/auth/meInfo", checkAuth, async (req, res) => {
  try {
    res.json({
      success: true,
    });
  } catch (error) {}
});

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 4000");
});
