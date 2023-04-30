import { Request, Response } from "express";
import { IMobile, IOptionalMobile } from "../models/IMobile";
import {
  createMobileToStrapi,
  deleteMobileFromStrapi,
  getAllMobilesFromStrapi,
  getMobileByIdFromStrapi,
  updateMobileByIdToStrapi,
} from "../services/strapiService";

class MobileController {
  async add(req: Request, res: Response) {
    const newMobile: IMobile = req.body;
    console.log(req.body);
    try {
      let response = await createMobileToStrapi({ data: newMobile });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 404 });
    }
  }

  async getAllMobiles(req: Request, res: Response) {
    try {
      let response = await getAllMobilesFromStrapi();
      console.log(response.data);
      return res.json(response.data);
    } catch (e) {
      return res.json({
        message: "Kunde tyvärr inte hämta telefonerna",
        status: 500,
      });
    }
  }

  async getMobileById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      const response = await getMobileByIdFromStrapi(id);
      return res.json(response.data);
    } catch {
      return res.json({
        message: "Mobilen hittades inte",
        status: 404,
        route: "/mobiles/:id",
      });
    }
  }

  async deleteMobileById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      await deleteMobileFromStrapi(id);
      return res.sendStatus(200);
    } catch (e) {
      return res.json({ message: e, status: 500 });
    }
  }

  async updateMobileById(req: Request, res: Response) {
    const id = +req.params.id;
    const updatedMobile: IOptionalMobile = req.body;
    try {
      const response = await updateMobileByIdToStrapi(id, {
        data: updatedMobile,
      });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 500 });
    }
  }
}

export default new MobileController();
