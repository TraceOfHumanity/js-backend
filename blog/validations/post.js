import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Please enter a title").isLength({ min: 2 }),
  body("body", "Please enter a body. Minimum length is 10 characters").isLength(
    { min: 10 }
  ),
  body("tags", "Please enter at least one tag").isLength({ min: 1 }),
];
