import bodyParser from "body-parser";
import express, { Router } from "express";
import audioDevicesController from "../controller/audioDevicesController";
import middleware from "../middleware/middleware";
import AudioValidator from "../validator/AudioValidator";

export const audioDevicesRouter: Router = express.Router();

audioDevicesRouter.use(bodyParser.json());
audioDevicesRouter.use(bodyParser.urlencoded({ extended: true }));

audioDevicesRouter.get(
  "/",
  middleware.handleValidationError,
  middleware.authenticateToken,
  audioDevicesController.getAllAudio
);

audioDevicesRouter.post(
  "/",
  AudioValidator.checkCreatedAudio(),
  middleware.handleValidationError,
  audioDevicesController.add
);

audioDevicesRouter.get(
  "/:id",
  AudioValidator.checkIdParam(),
  middleware.handleValidationError,
  audioDevicesController.getAudioById
);

audioDevicesRouter.delete(
  "/:id",
  AudioValidator.checkIdParam(),
  middleware.handleValidationError,
  audioDevicesController.deleteAudioById
);

audioDevicesRouter.put(
  "/:id",
  AudioValidator.checkIdParam(),
  audioDevicesController.updateAudioById
);
