import bodyParser from "body-parser";
import express, { Router } from "express";
import computersController from "../controller/computersController";
import ComputerValidator from "../validator/ComputerValidator";
import middleware from "../middleware/middleware";

export const computersRouter: Router = express.Router();

computersRouter.use(bodyParser.json());
computersRouter.use(bodyParser.urlencoded({ extended: true }));

computersRouter.get(
  "/",
  middleware.handleValidationError,
  computersController.getAllComputers
);

computersRouter.post(
  "/",
  ComputerValidator.checkCreatedComputer(),
  middleware.handleValidationError,
  computersController.add
);

computersRouter.get(
  "/:id",
  middleware.handleValidationError,
  ComputerValidator.checkIdParam(),
  computersController.getComputerById
);

computersRouter.delete("/:id", computersController.deleteComputerById);

computersRouter.put("/:id", computersController.updateComputerById);
