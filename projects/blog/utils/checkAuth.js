import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").split("Bearer ")[1];
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded._id;
      return next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token." });
    }
  } else {
    return res.status(401).json({ error: "You must be logged in." });
  }
};
