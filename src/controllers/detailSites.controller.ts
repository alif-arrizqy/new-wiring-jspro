import { Request, Response } from "express";
import detailSitesRepository from "../repositories/detailSites.repository";

export default class DetailSitesController {
  async findAll(req: Request, res: Response) {
    try {
      const response = await detailSitesRepository.retrieveAll();
      res.status(200).send(response);
    } catch (err) {
      res.status(200).send({
        message: `some error occured while retrieving data, ${err}`,
      });
    }
  }
}