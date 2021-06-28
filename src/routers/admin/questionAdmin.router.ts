const express = require("express");
const router = express.Router();
import { QuestionAdminController } from "../../controller/adminController/question.admin";

router.post("/updateByDoc", QuestionAdminController.updateQuestionsDoc);
export const questionAdminRouter = router;
