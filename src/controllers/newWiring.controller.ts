import { Request, Response } from "express";
import NewWiring from "../models/newWiring.model";
import newWiringRepository from "../repositories/newWiring.repository";

export default class NewWiringController {
  async create(req: Request, res: Response) {
    if (!req.body.sites_id) {
      res.status(400).send({
        message: "data can not be empty",
      });
      return;
    }

    try {
      const newWiring: NewWiring = req.body;
      if (!newWiring.status) newWiring.status = true;
      if (!newWiring.source_modbus) newWiring.source_modbus = "serial";

      const resp = await newWiringRepository.save(newWiring);
      res.status(201).send(resp);
    } catch (err) {
      res.status(200).send({
        message: "failed to create data",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const response = await newWiringRepository.retrieveAll();
      res.status(200).send(response);
    } catch (err) {
      res.status(200).send({
        message: "some error occured while retrieving data",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const sites_id: string = req.params.sites_id;
    try {
      const response = await newWiringRepository.retrieveBySitesId(sites_id);
      if (response) res.status(200).send(response);
      else
        res.status(404).send({
          message: `cannot find data with site ${sites_id}`,
        });
    } catch (err) {
      res.status(200).send({
        message: `error find data with site ${sites_id}`,
      });
    }
  }

  async update(req: Request, res: Response) {
    let data: NewWiring = req.body;
    data.id = parseInt(req.params.id);

    try {
      const resp = await newWiringRepository.update(data);
      if (resp == 1) {
        res.send({ message: "data was updated successfully" });
      } else {
        res.send({ message: `cannot update data with id ${data.id}` });
      }
    } catch (err) {
      res
        .status(200)
        .send({ message: `error updating data with id  ${data.id}` });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await newWiringRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "data was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete data with id=${id}`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `could not delete Tutorial with id ${id}`,
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await newWiringRepository.deleteAll();
      if (num == 1) {
        res.send({ message: `data were deleted successfully!` });
      }
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all tutorials.",
      });
    }
  }
}
