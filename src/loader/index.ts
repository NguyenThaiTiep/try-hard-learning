import { connectDatabase } from "./database/book-store-mysql";
import { connectDatabaseMongo } from "./database/question-store-mongo";
import { createFolder } from "./mkdir";

export const loaderApp = async () => {
  try {
    await connectDatabase();
    await connectDatabaseMongo();
    await createFolder();
  } catch (e) {
    console.log(e);
  }
};
