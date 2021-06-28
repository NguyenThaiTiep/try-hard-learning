import { docs_v1 } from "googleapis";
import { ImageDownLoad } from "../download/images";
/**
 *
 * @param pragraph
 * @param imgs
 * return paragraph format katex, style,image
 */
export const convertParagraph = (
  pragraph: docs_v1.Schema$Paragraph,
  imgs: ImageDownLoad
) => {};
/**
 *
 * @param style
 * lineSpacing
 * alignment
 * direction
 */
const parseStyle = (style: docs_v1.Schema$ParagraphStyle) => {};
