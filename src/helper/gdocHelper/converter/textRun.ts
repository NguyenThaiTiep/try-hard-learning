import { docs_v1 } from "googleapis";
import { Schema } from "inspector";
import { ImageDownLoad } from "../download/images";

export const parseTextRun = async (
  textrun: docs_v1.Schema$TextRun,
  table = false
) => {
  let style = await parseStyleTextRun(textrun.textStyle);
  let content = textrun.content;
  if (textrun.content === "\n" && table) {
    return "";
  }
  if (style.underline || style.bold || style.italic) {
    // content = content.replace("\n", "$\newline$");
    content =
      "\\" +
      `${style.italic ? "i" : ""}${style.bold ? "b" : ""}${
        style.underline ? "u" : ""
      }{${content}}`;
  }
  // if (style.foregroundColor) {
  //   content = `\\color[${style.foregroundColor}]{${content}}`;
  // }

  // if(style.)
  return content;
};
export const parseImage = async (
  textrun: docs_v1.Schema$InlineObjectElement,
  images: ImageDownLoad[],
  block = false
) => {
  const img = images.find((i) => i.id === textrun.inlineObjectId);

  let content = `\\image[width{${img.width}} height{${img.height}} className{${
    block ? "image-block" : "image-inline"
  }}]{${img.url}} `;

  return content;
};
interface StyleText {
  backgroundColor?: docs_v1.Schema$OptionalColor;

  baselineOffset?: string | null;

  bold?: boolean | null;

  fontSize?: docs_v1.Schema$Dimension;

  foregroundColor?: string;

  italic?: boolean | null;

  link?: string;

  smallCaps?: boolean | null;

  strikethrough?: boolean | null;

  underline?: boolean | null;

  weightedFontFamily?: docs_v1.Schema$WeightedFontFamily;
}
const parseStyleTextRun = (style: docs_v1.Schema$TextStyle) => {
  let result = { ...style } as any;

  if (result.foregroundColor) {
    result.foregroundColor = rbgColor(style.foregroundColor.color.rgbColor);
  }
  if (style.link) {
    result.link = result.link.url;
  }
  return result as StyleText;
};
const rbgColor = (color: docs_v1.Schema$RgbColor) =>
  rgbToHex(color.red || 0, color.green || 0, color.blue || 0);
const componentToHex = (c) => {
  var hex = (c * 255).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};
const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
