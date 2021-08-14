import { UploadController } from "../../controller/uploadController";

const express = require("express");
const router = express.Router();

router.post("/uploadFromHoclieuVn", UploadController.uploadFromHoclieuVn);
router.post("/uploadGdoc", UploadController.uploadGdoc);
export const uploadRouter = router;
