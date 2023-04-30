import bodyParser from "body-parser";
import express, { Router } from "express";
import usersController from "../controller/usersController";
import UserValidator from "../validator/UserValidator";
import middleware from "../middleware/middleware";

export const usersRouter: Router = express.Router();

usersRouter.use(bodyParser.json());
usersRouter.use(bodyParser.urlencoded({ extended: true }));

usersRouter.post(
  "/",
  UserValidator.checkCreatedUser(),
  middleware.handleValidationError,
  usersController.add
);

usersRouter.get("/", usersController.getAllUsers);

usersRouter.get("/:id", usersController.getUserById);

usersRouter.delete("/:id", usersController.deleteUserById);

// usersRouter.put("/:id", usersController.updateUserById);
