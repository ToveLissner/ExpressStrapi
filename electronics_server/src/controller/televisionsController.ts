import { Request, Response } from "express";
import { IOptionalTelevision, ITelevision } from "../models/ITelevision";
import {
  createTelevisionToStrapi,
  deleteTelevisionFromStrapi,
  getAllTelevisionsFromStrapi,
  getTelevisionByIdFromStrapi,
  updateTelevisionByIdToStrapi,
} from "../services/strapiService";

class TelevisionController {
  async add(req: Request, res: Response) {
    const newTelevision: ITelevision = req.body;
    console.log(req.body);
    try {
      let response = await createTelevisionToStrapi({ data: newTelevision });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 404 });
    }
  }

  async getAllTelevisions(req: Request, res: Response) {
    try {
      let response = await getAllTelevisionsFromStrapi();
      console.log(response.data);
      return res.json(response.data);
    } catch (e) {
      return res.json({
        message: "Kunde ej hämta tv-apparaterna",
        status: 500,
      });
    }
  }

  async getTelevisionById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      const response = await getTelevisionByIdFromStrapi(id);
      return res.json(response.data);
    } catch {
      return res.json({
        message: "Teven hittades inte",
        status: 404,
        route: "/televisions/:id",
      });
    }
  }

  async deleteTelevisionById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      await deleteTelevisionFromStrapi(id);
      return res.sendStatus(200);
    } catch (e) {
      return res.json({ message: e, status: 500 });
    }
  }

  async updateTelevisionById(req: Request, res: Response) {
    const id = +req.params.id;
    const updatedTelevision: IOptionalTelevision = req.body;
    try {
      const response = await updateTelevisionByIdToStrapi(id, {
        data: updatedTelevision,
      });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 500 });
    }
  }
}

export default new TelevisionController();
