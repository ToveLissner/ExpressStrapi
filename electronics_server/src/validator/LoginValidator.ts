import { body } from "express-validator";

class LoginValidator {
  loginCheck() {
    return [
      //   body("id").optional().isInt().withMessage("måste vara ett nummer"),
      body("username").notEmpty().withMessage("fältet får ej lämnas tomt"),
      body("password").notEmpty().withMessage("fältet får ej lämnas tomt"),
    ];
  }
}

export default new LoginValidator();
