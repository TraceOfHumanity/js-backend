import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import UserSchema from "./models/user.js";

dotenv.config();
const wss = new WebSocketServer({ port: process.env.PORT });

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
    wss.on("connection", (ws) => {
      console.log("Client connected");
      ws.on("message", async (message) => {
        message = JSON.parse(message);
        switch (message.type) {
          case "registration":
            console.log("Registration:", message);
            const user = await UserSchema.findOne({ email: message.email });
            if (user) {
              ws.send(
                JSON.stringify({
                  type: "error",
                  message: "User with this email already exists",
                })
              );
              return;
            } else {
              const newUser = new UserSchema({
                username: message.username,
                email: message.email,
                password: message.password,
              });
              newUser.save();
              ws.send(
                JSON.stringify({
                  type: "success",
                  message: "User created successfully",
                })
              );
            }
            break;
          case "login":
            console.log("Login:", message);
            break;
        }
      });
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  })
  .catch((err) => {
    console.log("DB error", err);
  });
