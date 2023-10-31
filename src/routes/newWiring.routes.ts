import { Router } from "express";
import NewWiringController from "../controllers/newWiring.controller";

class NewWiringRoutes {
  router = Router();
  controller = new NewWiringController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", this.controller.create);

    this.router.get("/", this.controller.findAll);

    this.router.get("/:sites_id", this.controller.findOne);

    this.router.put("/:id", this.controller.update);

    this.router.delete("/:id", this.controller.delete);

    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new NewWiringRoutes().router;
