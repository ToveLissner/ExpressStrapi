import bodyParser from "body-parser";
import express, { Router } from "express";
import loginsController from "../controller/loginsController";
import LoginValidator from "../validator/LoginValidator";

export const loginsRouter: Router = express.Router();

loginsRouter.use(bodyParser.json());
loginsRouter.use(bodyParser.urlencoded({ extended: true }));

loginsRouter.post("/", LoginValidator.loginCheck(), loginsController.userLogin);
