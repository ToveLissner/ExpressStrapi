import { Request, Response } from "express";
import { IAudio, IOptionalAudio } from "../models/IAudio";
import {
  createAudioToStrapi,
  deleteAudioFromStrapi,
  getAllAudioFromStrapi,
  getAudioByIdFromStrapi,
  updateAudioByIdToStrapi,
} from "../services/strapiService";

class AudioController {
  async add(req: Request, res: Response) {
    const newAudio: IAudio = req.body;
    console.log(req.body);
    try {
      let response = await createAudioToStrapi({ data: newAudio });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 404 });
    }
  }

  async getAllAudio(req: Request, res: Response) {
    try {
      let response = await getAllAudioFromStrapi();
      console.log(response.data);
      return res.json(response.data);
    } catch (e) {
      return res.json({
        message: "Gick ej att hämta produkterna",
        status: 500,
      });
    }
  }

  async getAudioById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      const response = await getAudioByIdFromStrapi(id);
      return res.json(response.data);
    } catch {
      return res.json({
        message: "Kunde ej hitta vad du sökte",
        status: 404,
        route: "/audio-devices/:id",
      });
    }
  }

  async deleteAudioById(req: Request, res: Response) {
    const id = +req.params.id;
    try {
      await deleteAudioFromStrapi(id);
      return res.sendStatus(200);
    } catch (e) {
      return res.json({ message: e, status: 500 });
    }
  }

  async updateAudioById(req: Request, res: Response) {
    const id = +req.params.id;
    const updatedAudio: IOptionalAudio = req.body;
    try {
      const response = await updateAudioByIdToStrapi(id, {
        data: updatedAudio,
      });
      return res.json(response.data);
    } catch (e) {
      return res.json({ message: e, status: 500 });
    }
  }
}

export default new AudioController();
