import { Sequelize } from "sequelize-typescript";
import config from "../config/db.config";
import NewWiring from "../models/newWiring.model";
import DetailSites from "../models/detailSites.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    const uri = `${config.DIALECT}://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.PORT}/${config.DB}`;
    this.sequelize = new Sequelize(uri, {
      logging: false,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
      models: [NewWiring, DetailSites]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;
