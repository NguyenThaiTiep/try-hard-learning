import { createHash, Hash } from "crypto";
import { createWriteStream } from "fs";
import got from "got/dist/source";

import { request } from "http";
import sharp = require("sharp");

export const downloadImage = async (input: {
  url: string;
  width: number;
  height: number;
  dest: string;
}) => {
  const { url, width, height, dest } = input;
  try {
    const sharpStream = sharp({
      failOnError: false,
    });
  
    let file = await got.stream(url).pipe(sharpStream).toBuffer();
    let md5 = createHash("md5");
    const fileName = genarateFileName(
      dest,
      md5.update(file.toString("base64")),
      width,
      height
    );
    const img = await sharpStream
      .clone()
      .png({ quality: 100 })
      .resize({ width: width || 500, height: height || 500 })
      .toFile("./public" + fileName)
      .then((info) => {
        return fileName;
      });
    return img;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const genarateFileName = (dest: string, hash: Hash, width, height) => {
  return (
    "/images" + dest + "/" + hash.digest("hex") + `_${width}_${height}` + ".png"
  );
};
