import bodyParser from "body-parser";
import express, { Router } from "express";
import audioDevicesController from "../controller/audioDevicesController";

export const audioDevicesRouter: Router = express.Router();

audioDevicesRouter.use(bodyParser.json());
audioDevicesRouter.use(bodyParser.urlencoded({ extended: true }));

audioDevicesRouter.get(
  "/",
  //   Middleware.handleValidationError,
  audioDevicesController.getAllAudio
);

audioDevicesRouter.post(
  "/",
  //   ComputerValidator.checkCreatedMobile(),
  //   Middleware.handleValidationError,
  audioDevicesController.add
);

audioDevicesRouter.get(
  "/:id",
  //   ComputerValidator.checkIdParam(),
  // Middleware.handleValidationError,
  audioDevicesController.getAudioById
);

audioDevicesRouter.delete(
  "/:id",
  //   ComputerValidator.checkIdParam(),
  // Middleware.handleValidationError,
  audioDevicesController.deleteAudioById
);

audioDevicesRouter.put(
  "/:id",
  //   ComputerValidator.checkIdParam(),
  // Middleware
  audioDevicesController.updateAudioById
);
