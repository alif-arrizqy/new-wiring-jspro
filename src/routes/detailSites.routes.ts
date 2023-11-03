import { Router } from "express";
import DetailSitesController from "../controllers/detailSites.controller";

class DetailSitesRoutes {
  router = Router();
  controller = new DetailSitesController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", this.controller.findAll);
  }
}

export default new DetailSitesRoutes().router;