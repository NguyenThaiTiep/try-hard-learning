import { StoreQuestion } from "../../../settings/constant";

export const configDbMongo = {
  type: "mongodb",
  name: StoreQuestion,
  host: process.env.DB_MG_HOST,
  port: process.env.DB__MGPORT,
  database: process.env.DB_MG_DATABASE,
  synchronize: true,
  logging: false,
  useUnifiedTopology: true,
  entities: ["src/models/**/*{.ts, .js}"],
  migrations: ["src/models/**/*{.ts, .js}"],
  subscribers: ["src/models/**/*{.ts, .js}"],
  cli: {
    entitiesDir: "src/models",
  },
};
