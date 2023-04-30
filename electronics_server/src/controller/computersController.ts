import { Request, Response } from "express";
import { IComputer, IOptionalComputer } from "../models/IComputer";
import {
  createComputerToStrapi,
  deleteComputerFromStrapi,
  getAllComputersFromStrapi,
  getComputerByIdFromStrapi,
  updateComputerByIdToStrapi,
} from "../services/strapiService";

class ComputerController {
  async add(req: Request, res: Response) {
    const newComputer: IComputer = req.body;
    console.log(req.body);
    try {
      let response = await createComputerToStrapi({ data: newComputer });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 404 });
    }
  }

  async getAllComputers(req: Request, res: Response) {
    try {
      let response = await getAllComputersFromStrapi();
      console.log(response.data);
      return res.json(response.data);
    } catch (e) {
      return res.json({
        message: "Kunde ej hämta datorerna",
        status: 500,
      });
    }
  }

  async getComputerById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      const response = await getComputerByIdFromStrapi(id);
      return res.json(response.data);
    } catch {
      return res.json({
        message: "Datorn hittades inte",
        status: 404,
        route: "/computers/:id",
      });
    }
  }

  async deleteComputerById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      const foundComputerToDelete = await getComputerByIdFromStrapi(id);
      if (!foundComputerToDelete) {
        return res
          .status(404)
          .json({ message: `Hittade ingen dator med id ${id}` });
      } else {
        await deleteComputerFromStrapi(id);
        return res.sendStatus(200);
      }
    } catch (e) {
      return res.json({ message: "Något gick fel", status: 500 });
    }
  }

  async updateComputerById(req: Request, res: Response) {
    const id = +req.params.id;
    const updatedComputer: IOptionalComputer = req.body;
    try {
      const response = await updateComputerByIdToStrapi(id, {
        data: updatedComputer,
      });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 500 });
    }
  }
}

export default new ComputerController();
