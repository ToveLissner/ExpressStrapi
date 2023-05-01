import bodyParser from "body-parser";
import express, { Router } from "express";
import mobilesController from "../controller/mobilesController";
import MobileValidator from "../validator/MobileValidator";
import middleware from "../middleware/middleware";
import authorization from "../middleware/authorization";

export const mobilesRouter: Router = express.Router();

mobilesRouter.use(bodyParser.json());
mobilesRouter.use(bodyParser.urlencoded({ extended: true }));

mobilesRouter.get("/", mobilesController.getAllMobiles);

mobilesRouter.post(
  "/",
  MobileValidator.checkCreatedMobile(),
  middleware.handleValidationError,
  authorization.authenticateToken,

  mobilesController.add
);

mobilesRouter.get("/:id", mobilesController.getMobileById);

mobilesRouter.delete(
  "/:id",
  authorization.authenticateToken,
  mobilesController.deleteMobileById
);

mobilesRouter.put(
  "/:id",
  authorization.authenticateToken,
  mobilesController.updateMobileById
);
