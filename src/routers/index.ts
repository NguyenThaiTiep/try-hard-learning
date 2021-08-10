import { questionAdminRouter } from "./admin/questionAdmin.router";
import { uploadRouter } from "./uploadRouter";

export const routerApp = (app) => {
  app.use("/upload", uploadRouter);
  app.use("/admin/question", questionAdminRouter);
};
