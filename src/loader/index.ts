import { connectDatabase } from "./database/book-store-mysql";

import { createFolder } from "./mkdir";

export const loaderApp = async () => {
  try {
    // await connectDatabase();

    await createFolder();
  } catch (e) {
    console.log(e);
  }
};
