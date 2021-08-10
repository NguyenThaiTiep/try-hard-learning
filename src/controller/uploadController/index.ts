import { downloadImages } from "../../helper/gdocHelper/download/images";

const uploadFromHoclieuVn = async (req, res) => {
  const { key, inlineObjectElement } = req.body;
  // key = bb5b-5347be30cc3a
  if (key !== "bb5b-5347be30cc3a") {
    return res.send(401);
  }
  try {
    const dest = "/ktdg";
    const images = await downloadImages(inlineObjectElement, dest);
    return res.send({ images });
  } catch (e) {
    console.log(e);
  }
};
export const UploadController = { uploadFromHoclieuVn };
