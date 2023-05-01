import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { IJwtPayload } from "../models/IJwtPayload";

class Authorization {
  authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
      jwt.verify(
        token,
        process.env.JWT_TOKEN as string,
        undefined,
        (err: VerifyErrors | null, decoded: object | undefined) => {
          if (err) {
            return res.status(403).json({ error: "Ogiltig token!" });
          }
          const payload = decoded as IJwtPayload;
          req.body.username = payload.username;
          next();
        }
      );
    } else {
      return res.status(401).json({ error: "Token saknas" });
    }
  }
}

export default new Authorization();
