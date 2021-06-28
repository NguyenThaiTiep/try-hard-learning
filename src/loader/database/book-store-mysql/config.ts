import { StoreQuestion } from "../../../settings/constant";
const dir = process.env.NODE_ENV == "production" ? "dist" : "src/";
export const configDb = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [dir + "/**/entity/**/*.js"],
  migrations: [dir + "/**/migration/**/*{.ts, .js}"],
  subscribers: [dir + "/**/subscriber/**/*{.ts, .js}"],
  cli: {
    entitiesDir: dir + "/entity",
    migrationsDir: dir + "/migration",
    subscribersDir: dir + "/subscriber",
  },
};
