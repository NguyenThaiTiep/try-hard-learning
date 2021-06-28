import { questionAdminRouter } from "./admin/questionAdmin.router";

export const routerApp = (app) => {
  app.use("/admin/question", questionAdminRouter);
};
