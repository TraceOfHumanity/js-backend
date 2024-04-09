import { body } from "express-validator";

export const registerValidation = [
  body("email", "Please enter a valid email address").isEmail(),
  body(
    "password",
    "Please enter a password with at least 8 characters"
  ).isLength({ min: 8 }),
  body("fullName", "Please enter your full name").isLength({ min: 2 }),
  body("avatarUrl", "Please enter a valid URL for your avatar")
    .optional()
    .isURL(),
];

export const loginValidation = [
  body("email", "Please enter a valid email address").isEmail(),
  body(
    "password",
    "Please enter a password with at least 8 characters"
  ).isLength({ min: 8 }),
];
