import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { mobilesRouter } from "./router/mobilesRouter";
import { computersRouter } from "./router/computersRouter";
import { televisionsRouter } from "./router/televisionsRouter";
import { audioDevicesRouter } from "./router/audioDevicesRouter";
import * as dotenv from "dotenv";
import { usersRouter } from "./router/usersRouter";
import { loginsRouter } from "./router/loginsRouter";

dotenv.config();

const app = express();
const PORT = 4646;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/products", productsRouter);
app.use("/televisions", televisionsRouter);
app.use("/mobiles", mobilesRouter);
app.use("/computers", computersRouter);
app.use("/audio", audioDevicesRouter);
app.use("/users", usersRouter);
app.use("/login", loginsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("startsida");
});

app.listen(PORT, () =>
  console.log(`Din server körs på: http://localhost:${PORT}`)
);
