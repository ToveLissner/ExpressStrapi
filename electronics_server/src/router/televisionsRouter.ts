import bodyParser from "body-parser";
import express, { Router } from "express";
import televisionsController from "../controller/televisionsController";

export const televisionsRouter: Router = express.Router();

televisionsRouter.use(bodyParser.json());
televisionsRouter.use(bodyParser.urlencoded({ extended: true }));

televisionsRouter.get("/", televisionsController.getAllTelevisions);

televisionsRouter.post("/", televisionsController.add);

televisionsRouter.get(
  "/:id",
  //   TelevisionValidator.checkIdParam(),
  televisionsController.getTelevisionById
);

televisionsRouter.delete(
  "/:id",
  //   TelevisionValidator.checkIdParam(),
  // Middleware.handleValidationError,
  televisionsController.deleteTelevisionById
);

televisionsRouter.put(
  "/:id",
  //   TelevisionValidator.checkIdParam(),
  // Middleware
  televisionsController.updateTelevisionById
);
