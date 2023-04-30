import bodyParser from "body-parser";
import express, { Router } from "express";
import computersController from "../controller/computersController";

export const computersRouter: Router = express.Router();

computersRouter.use(bodyParser.json());
computersRouter.use(bodyParser.urlencoded({ extended: true }));

computersRouter.get(
  "/",
  //   Middleware.handleValidationError,
  computersController.getAllComputers
);

computersRouter.post(
  "/",
  //   ComputerValidator.checkCreatedMobile(),
  //   Middleware.handleValidationError,
  computersController.add
);

computersRouter.get(
  "/:id",
  //   ComputerValidator.checkIdParam(),
  // Middleware.handleValidationError,
  computersController.getComputerById
);

computersRouter.delete(
  "/:id",
  //   ComputerValidator.checkIdParam(),
  // Middleware.handleValidationError,
  computersController.deleteComputerById
);

computersRouter.put(
  "/:id",
  //   ComputerValidator.checkIdParam(),
  // Middleware
  computersController.updateComputerById
);
