import { docs_v1 } from "googleapis";

import { downloadImage } from "../../../service/download/image";
import { hostServer } from "../../../settings/dir";

/**
 *
 * @param lineObjectImage : lineObject gdoc data return
 * return ImageDto [] and download images to /public/images/questions/
 */
const dest = "/questions";
export interface ImageDownLoad {
  id: string;
  url: string;
  width: string;
  height: string;
}
export const downloadImages = async (
  lineObjectImage: docs_v1.Schema$InlineObject
) => {
  if (!lineObjectImage) {
    return [];
  }

  try {
    let promises = [];
    let images = [];
    for (let key in lineObjectImage) {
      const inine_object = lineObjectImage[key];
      const url =
        inine_object.inlineObjectProperties.embeddedObject.imageProperties
          .contentUri;
      const width = Math.round(
        inine_object.inlineObjectProperties.embeddedObject.size.width
          .magnitude * 1.3333
      );
      const height = Math.round(
        inine_object.inlineObjectProperties.embeddedObject.size.height
          .magnitude * 1.3333
      );

      let newUrl = await downloadImage({ url, width, height, dest });
      images.push({ url: hostServer + newUrl, id: key, width, height });
    }

    return images;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const removeImage = (lineObjectImage: any) => {
  if (!lineObjectImage) {
    return [];
  }
};
