import { Application } from "express";
import newWiringRoutes from "./newWiring.routes";
import detailSitesRoutes from "./detailSites.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", newWiringRoutes);
    app.use("/api/detail/site", detailSitesRoutes);
  }
}
