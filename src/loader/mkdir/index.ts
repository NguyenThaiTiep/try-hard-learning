import * as fs from "fs";

export const createFolder = () => {
  try {
    var dirs = ["./public", "./public/avatars", "./public/audios"];

    for (const dir of dirs) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }
    console.log("created directories");
  } catch (e) {
    console.log(e);
  }
};
