import express, { Application } from "express";
import Routes from "./routes";
import cors, { CorsOptions } from "cors";
import Database from "./db";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOption: CorsOptions = {
      origin: "*",
    };

    app.use(cors(corsOption));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private syncDatabase(): void {
    const db = new Database();
    db.sequelize?.sync();
    
  }
}
