import { createConnection } from "typeorm";
import { configDb } from "./config";
import { roleLoader } from "./role.loader";

export const connectDatabase = () =>
  createConnection(configDb as any)
    .then(async (connection) => {
      console.log("Connected Database");
      try {
        await roleLoader();
        console.log("loader StaticData");
      } catch (e) {
        console.log(e);
      }
    })
    .catch((error) => console.log(error));
