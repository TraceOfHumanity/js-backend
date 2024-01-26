import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "alex",
    },
    "secret123"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Server is running on port 4000");
});
