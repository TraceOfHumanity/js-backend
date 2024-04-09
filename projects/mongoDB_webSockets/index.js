import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import mongoose from "mongoose";

dotenv.config();
const wss = new WebSocketServer({ port: process.env.PORT });

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
    wss.on("connection", (ws) => {
      console.log("Client connected");
      ws.on("message", (message) => {
        message = JSON.parse(message);
        switch (message.type) {
          case "registration":
            console.log("Registration:", message);
            break;
          case "login":
            console.log("Login:", message);
            break;
        }
        // console.log("Received:", message);
      });
      ws.on("close", () => {
        console.log("Client disconnected");
      });
    });
  })
  .catch((err) => {
    console.log("DB error", err);
  });
