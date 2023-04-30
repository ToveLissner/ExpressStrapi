import { Request, Response, response } from "express";
import { checkUserName, checkUserNameAndPassword, login } from "../database/db";

class LoginsController {
  async userLogin(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const body = req.body;
    await checkUserNameAndPassword(
      username,
      password,
      (err: Error, result: any) => {
        console.log("här" + result.count);
        const foundUser = result[0].count;
        const found = foundUser === 1;
        console.log(found);
        try {
          if (found) {
            const inside = login({ ...body }, (err: Error) => {
              return res.json({
                body,
                message: "hej",
              });
            });
          } else {
            res.json({
              message: "hejdå",
            });
          }
        } catch (e) {}
      }
    );
  }
}

export default new LoginsController();
