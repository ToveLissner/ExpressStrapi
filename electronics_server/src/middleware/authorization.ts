import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { IJwtPayload } from "../models/IJwtPayload";

class Authorization {
  authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: "Token saknas" });
    }
    jwt.verify(
      token,
      process.env.JWT_TOKEN as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ error: "Ogiltig token!" });
        }
        const payload = decoded as IJwtPayload;
        req.body.username = payload.username;
        next();
      }
    );
  }
}

export default new Authorization();
