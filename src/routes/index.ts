import { Application } from "express";
import newWiringRoutes from "./newWiring.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", newWiringRoutes);
  }
}
