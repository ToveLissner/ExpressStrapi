import { body, param } from "express-validator";

class ComputerValidator {
  checkCreatedComputer() {
    return [
      body("id").optional().isInt().withMessage(" "),
      body("name").notEmpty().withMessage("Var god ange titel"),
      body("description").notEmpty().withMessage("var god ange en beskrivning"),
      body("manufacturer").notEmpty().withMessage("var god ange tillverkare"),
      body("price").notEmpty().withMessage("var god ange pris"),
      body("processor").notEmpty().withMessage("var god ange processor"),
    ];
  }

  checkIdParam() {
    return [
      param("id")
        .notEmpty()
        .withMessage("lämna ej fältet tomt")
        .isInt()
        .withMessage("id ska vara ett nummer"),
    ];
  }
}

export default new ComputerValidator();
