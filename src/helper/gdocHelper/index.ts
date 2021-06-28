// import { Document } from "../../dto/document/document";
import { docs_v1 } from "googleapis";
import { SubQuestion } from "../../dto/question/subQuestion.dto";
import { Question } from "../../entity/book/questions";

import { convertToData, Section } from "./converter";
import { downloadImages } from "./download/images";
import { convertSection } from "./section";

/**
 * 1. imageDto []
 *
 * 2. sections[] split from h1, h2, h3, h4, h5,..
 *
 * - image download and save array
 * - convert doc to section tree contain table,paragraph
 *
 */
export interface NodeInterFace {
  item: {
    introduct: string;
    content?: string;
  };
  childs: NodeInterFace[];
  questions?: Question[];
}
export const converter = async (doc: docs_v1.Schema$Document) => {
  let imgs;
  let section: Section;
  try {
    imgs = await downloadImages(doc.inlineObjects);

    section = await convertSection([...doc.body.content]);

    const data = await convertToData(section.childs, imgs);

    // elements.
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
