import { body, param } from "express-validator";

class UserValidator {
  checkCreatedUser() {
    return [
      body("id").optional().isInt().withMessage("måste vara ett nummer"),
      body("username").notEmpty().withMessage("fältet får ej lämnas tomt"),
      // .isAlpha()
      // .withMessage("användarnamnet måste vara unikt"),
      body("password").notEmpty().withMessage("välj ett lösenord"),
    ];
  }

  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("The value should not be empty")
        .isInt()
        .withMessage("id should be a number"),
    ];
  }
}

export default new UserValidator();
