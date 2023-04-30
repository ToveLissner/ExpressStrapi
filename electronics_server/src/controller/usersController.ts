import { Request, Response, response } from "express";
import {
  checkUserName,
  createUser,
  deleteById,
  getAll,
  getById,
} from "../database/db";
import { IUser } from "../models/IUser";

class UserController {
  async add(req: Request, res: Response) {
    const username = req.body.username;
    const body = req.body;
    await checkUserName(username, (err: Error, result: any) => {
      console.log(result);
      const foundUsername = result[0].count;
      const existingUsername = foundUsername === 1;
      try {
        if (!existingUsername) {
          const newUser = createUser({ ...body }, (err: Error) => {
            if (err)
              res.json({
                err,
                message: "Något gick fel",
                status: 400,
              });
            return res.json({
              body,
              message: "Användare tillagd",
              status: 201,
            });
          });
        } else {
          res.json({
            message: `Användarnamnet ${username} används redan, var god välj ett annat användarnamn`,
            status: 409,
          });
        }
      } catch (e) {
        return res.json({
          message: "Något gick snett",
          status: 500,
        });
      }
    });
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      await getAll((err: Error, accounts: IUser[]) => {
        if (!accounts)
          return res.json({
            err,
            message: "Hittades inte",
            status: 404,
          });

        return res.send(accounts);
      });
    } catch (e) {
      return res.json({
        message: "Det gick inte",
        status: 500,
      });
    }
  }

  async getUserById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      await getById(id, (err: Error, user: IUser) => {
        if (!user) {
          return res.json({
            err,
            message: `Någon användare med id: '${id}' kunde ej hittas`,
            status: 404,
          });
        } else {
          return res.send(user);
        }
      });
    } catch {
      return res.json({
        message: "Något gick fel",
        status: 500,
        route: "/users/:id",
      });
    }
  }

  // något fel med min radering, den visar alltid ok //

  async deleteUserById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      await deleteById(id);
      return res.sendStatus(200);
    } catch (e) {
      return res.json({ status: 500 });
    }
  }

  //   async updateUserById(req: Request, res: Response) {
  //     const id = +req.params.id;
  //     const updatedUser: IUser = req.body;
  //     try {
  //       await updateById(id, updatedUser);
  //       return res.json(updatedUser);
  //     } catch (e) {
  //       return res.json({ message: e, status: 500 });
  //     }
  //   }
}

export default new UserController();

// async add(req: Request, res: Response) {
//   let username = req.body.username;
//   const body = req.body;

//   await checkUserName(username, (error: Error, results: any) => {
//     const count = results[0].count;

//     const foundUsername = count === 1;
//     try {
//       if (!foundUsername) {
//         const record = createUser({ ...body }, (err: any) => {
//           if (err)
//             return res.status(400).json({
//               err,
//               message: "Gick ej att registrera användare",
//             });
//           return res.status(201).json({
//             username,
//             message: "Användare registrerad",
//           });
//         });
//       } else {
//         return res
//           .status(409)
//           .json({ message: `Användare med namnet ${username} finns redan!` });
//       }
//     } catch (e) {
//       return res.status(500).json({ message: "Fel i registreringen" });
//     }
//   });
// }
