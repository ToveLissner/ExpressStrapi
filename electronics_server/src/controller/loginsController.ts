import { Request, Response, response } from "express";
import { checkUserName, checkUserNameAndPassword, login } from "../database/db";
import jwt, { Secret, SignCallback } from "jsonwebtoken";

class LoginsController {
  async userLogin(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const body = req.body;
    await checkUserNameAndPassword(
      username,
      password,
      (err: Error, result: any) => {
        const foundUser = result[0].count;
        const found = foundUser === 1;
        console.log(found);
        try {
          if (!found) {
            const inside = login({ ...body }, (err: Error) => {
              res.json({
                err,
                message: "Användarnamnet matchade inte lösenordet",
              });
            });
          } else {
            const token: string = jwt.sign(
              { username: req.body.username },
              process.env.JWT_TOKEN || ""
            );
            return res.json({
              body,
              token,
              message: "Inloggad",
              status: 200,
            });
          }
        } catch (e) {
          return res.json({
            message: "Något gick snett!",
            status: 500,
          });
        }
      }
    );
  }
}

export default new LoginsController();
