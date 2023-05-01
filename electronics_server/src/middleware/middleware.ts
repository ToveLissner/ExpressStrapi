import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

class Middleware {
  handleValidationError(req: Request, res: Response, next: NextFunction) {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json(error.array()[0]);
    }
    next();
  }

  AuthenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token saknas" });
    }

    jwt.verify(token, process.env.JWT_TOKEN as string),
      (err: Error, payload: any) => {
        if (err) {
          return res.status(403).json({ error: "Ogiltig token!" });
        }

        // ändrade från user till body

        req.body = payload as JwtPayload;
        next();
      };
  }
}

export default new Middleware();
