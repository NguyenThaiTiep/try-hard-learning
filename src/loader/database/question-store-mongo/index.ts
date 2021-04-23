import { createConnection } from "typeorm";
import { configDbMongo } from "./config";

export const connectDatabaseMongo = () =>
  createConnection(configDbMongo as any)
    .then(async (connection) => {
      console.log("Connected MongoDb");
      try {
      } catch (e) {
        console.log(e);
      }
    })
    .catch((error) => console.log(error));
