import { text } from "body-parser";
import { AnyARecord } from "dns";
import { docs_v1 } from "googleapis";
import {
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
  SUBTITLE,
  TITLE,
} from "../constance/typehead";
import { ImageDownLoad } from "../download/images";
import { convertParagraph } from "./paragraph";
import { getContentTable } from "./table";
import { parseImage, parseTextRun } from "./textRun";
export interface Section {
  typeHead?: string;
  startIndex?: number;
  endIndex?: number;
  paragraph?: docs_v1.Schema$Paragraph;
  table?: docs_v1.Schema$Table;
  childs?: Section[];
  content?: docs_v1.Schema$StructuralElement[];
  subtitle?: [];
}
/**
 *
 * @param sections
 * @param imgs
 * return EntityData array  Node, questions, subquestion
 */
export const convertToData = async (
  sections: Section[],
  imgs: ImageDownLoad[]
) => {
  try {
    const data = await Promise.all(
      sections.map(
        async (section, i_section) => await convertSectionToData(section, imgs)
      )
    );
    return data.filter((i) => i.item);
  } catch (e) {
    console.log(e);

    throw e;
  }
};
/**
 *
 * @param sections
 * @param imgs
 * convert section to data from section
 * handle convert data with headType, paragraph, table and childs
 */
interface sectionData {}
const convertSectionToData = async (
  section: Section,
  imgs: ImageDownLoad[]
) => {
  try {
    let sectionData = {} as any;
    if (!section.typeHead) {
      return;
    }
    switch (section.typeHead) {
      case TITLE:
        break;
      case HEADING_1:
      case HEADING_2:
      case HEADING_3:
        if (section.childs) {
          sectionData.item = await convertNode(section, imgs);
          sectionData.childs = await Promise.all(
            section.childs.map(
              async (child) => await convertSectionToData(child, imgs)
            )
          );
        }
        sectionData.childs = sectionData.childs.filter((i) => i.item);
        break;
      case HEADING_4:
        sectionData.item = await convertNode(section, imgs);
        if (section.childs) {
          sectionData.questions = await Promise.all(
            section.childs.map(
              async (child) => await convertSectionToData(child, imgs)
            )
          );
        }
        sectionData.questions = sectionData.questions.filter((i) => i.item);
        // sectionData.item = await convertQuestionSet(section, imgs);

        break;

      case HEADING_5:
        sectionData.item = await convertQuestion(section, imgs);
        if (section.childs) {
          sectionData.subQuestions = await Promise.all(
            section.childs.map(
              async (child) => await convertSectionToData(child, imgs)
            )
          );
          sectionData.subQuestions = sectionData.subQuestions.filter(
            (i) => i.introduct || i.content
          );
        }
        break;
      case HEADING_6:
        //subquestion
        sectionData = await convertQuestion(section, imgs);
        if (section.childs) {
          let content = [];
          content = await Promise.all(
            section.childs.map(
              async (child) => await getContentElement(child, imgs)
            )
          );
          sectionData.content = content.join("");
        }
        break;
      case SUBTITLE:
        break;
      default:
        break;
    }

    return sectionData;
  } catch (e) {
    console.log(e);
  }
};

/**
 *
 * @param section
 * @param imgs
 * return {text : []}
 */
const convertNode = async (section: Section, imgs: ImageDownLoad[]) => {
  const texts = await getContentElement(section, imgs);

  return { introduction: texts };
};
const convertQuestionSet = async (
  section: Section,
  imgs: ImageDownLoad[]
) => {};
const convertQuestion = async (section: Section, imgs: ImageDownLoad[]) => {
  const introductTexts = await getContentElement(section, imgs);
  let content = [];
  if (section.content) {
    content = await Promise.all(
      section.content.map(async (ct) => await getContentElement(ct, imgs))
    );
  }
  return { introduction: introductTexts, content: content.join("") };
};
/**
 * get subquestion by heading 6
 */
export const getContentElement = async (
  element: docs_v1.Schema$StructuralElement,
  imgs: ImageDownLoad[]
) => {
  if (element.paragraph) {
    return await await getContentParagraph(element.paragraph, imgs);
  } else if (element.table) {
    return await getContentTable(element.table, imgs);
  } else return;
};
export const getContentParagraph = async (
  paragraph: docs_v1.Schema$Paragraph,
  imgs: ImageDownLoad[],
  table = false
) => {
  let lenght = paragraph.elements.length;
  const text = await Promise.all(
    paragraph.elements.map(async (element, index) => {
      if (element.inlineObjectElement) {
        let block = false;
        if (index > 0)
          console.log(paragraph.elements[index - 1].textRun.content);

        if (lenght == 2) {
          // ảnh đã được xuống dòng
          block = true;
        }
        return await parseImage(element.inlineObjectElement, imgs, block);
      } else {
        return await parseTextRun(element.textRun, table);
      }
    })
  );
  return text.join("");
};
/**
 * GET content question by normal text
 */
