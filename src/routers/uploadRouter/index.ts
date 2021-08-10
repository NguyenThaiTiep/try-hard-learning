import { UploadController } from "../../controller/uploadController";

const express = require("express");
const router = express.Router();

router.post("/uploadFromHoclieuVn", UploadController.uploadFromHoclieuVn);
export const uploadRouter = router;
