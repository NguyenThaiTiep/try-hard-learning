import { handleResponse } from "../../helper/apiHelper/response.helper";
import { downloadOneImage } from "../../helper/gdocHelper/download/images";
import { pushDataElement } from "../../service/google-api/g-sheet-api";

const uploadFromHoclieuVn = async (req, res) => {
  const { key, inlineObjectElement } = req.body;
  //   console.log(inlineObjectElement);

  // key = bb5b-5347be30cc3a
  if (key !== "bb5b-5347be30cc3a") {
    return res.send(401);
  }
  try {
    const dest = "/ktdg";
    const images = await downloadOneImage(inlineObjectElement, dest);

    return res.send({ images });
  } catch (e) {
    console.log(e);
    return res.send(401);
  }
};
const uploadGdoc = async (req, res) => {
  const docId = "14vkNcZHL9D9Bv6gsxnv-A9x7n1wzSzLqPj7p7CvD2k0";
  const data = await pushDataElement();
  return handleResponse(res, 200, { data });
};
export const UploadController = { uploadFromHoclieuVn, uploadGdoc };
