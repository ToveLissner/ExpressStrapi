import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

interface jwtPayload {
  username: string;
}

class Middleware {
  handleValidationError(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json(error.array()[0]);
    }
    next();
  }

  authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(req.headers);
    console.log("token:" + token);

    if (!token) {
      return res.status(401).json({ error: "Token saknas" });
    }

    jwt.verify(token, process.env.JWT_TOKEN as string),
      (err: Error, payload: jwtPayload) => {
        if (err) {
          return res.status(403).json({ error: "Ogiltig token!" });
        }

        req.body.username = payload as jwtPayload;
        next();
      };
  }
}

export default new Middleware();
