import { docs_v1 } from "googleapis";
import { slides } from "googleapis/build/src/apis/slides";
import { isArray } from "util";
import { node } from "webpack";

import { HEADING_1, NORMAL_TEXT, SUBTITLE } from "../constance/typehead";
import { getContentElement, Section } from "../converter";
/**
 *
 * @param content : content data googledoc return
 * return section tree inorder to convert question data
 */
export const convertSection = async (
  content: docs_v1.Schema$StructuralElement[]
) => {
  let metas;
  let sections: Section;
  try {
    content = content.filter((i) => !i.sectionBreak);
    sections = await convertArray([...content]);
    return sections;
  } catch (e) {
    throw e;
  }
};

const splitNode = async (
  typehead: number,
  content: docs_v1.Schema$StructuralElement[] | docs_v1.Schema$StructuralElement
) => {
  try {
    // return content;
    const type = `HEADING_${typehead}`;

    if (Array.isArray(content)) {
      let start = 0;
      let end = 0;
      let nodes = [] as docs_v1.Schema$StructuralElement[][];
      let node_indexs = [];
      content.forEach((element, index) => {
        if (
          element.paragraph &&
          element.paragraph.paragraphStyle.namedStyleType == type
        ) {
          node_indexs.push(index);
        }
      });
      node_indexs.push(content.length);
      // console.log(node_indexs);

      node_indexs.forEach((i, index) => {
        if (i != 0) {
          nodes.push(content.slice(node_indexs[index - 1], i));
        }
      });

      return nodes.filter((i) => i && i.length);
    } else {
      return [content];
    }
  } catch (e) {
    throw e;
  }
};
const convertArray = async (
  elements:
    | docs_v1.Schema$StructuralElement[]
    | docs_v1.Schema$StructuralElement,
  index = 1
) => {
  try {
    let data = {} as Section;
    //find index element has heading HEADING_${index}
    if (isArray(elements)) {
      let index_heading = await findIndexElement(elements, index);
      data = { ...elements[0] };

      data.typeHead = elements[0].paragraph.paragraphStyle.namedStyleType;

      elements.shift();

      data.content = await getContent(index_heading, elements);
      data.subtitle = await getSubTilte(elements, index_heading);

      if (index_heading == -1) {
        // trong này mảng chỉ có content
      } else {
        let nodeElements = await splitNode(index_heading, elements);
        if (nodeElements) {
          data.childs = await Promise.all(
            nodeElements.map(async (nodes) => {
              return await convertArray(nodes, index_heading + 1);
            })
          );
        }
      }
    } else {
    }
    return data;
  } catch (e) {
    throw e;
  }
};

const findIndexElement = async (
  elements: docs_v1.Schema$StructuralElement[],
  index = 1
) => {
  if (index === 7) {
    return -1;
  }
  let type = `HEADING_${index}`;
  let i = index;
  let found = false;
  let index_element = elements.findIndex(
    (i) => i.paragraph && i.paragraph.paragraphStyle.namedStyleType === type
  );
  found = index_element !== -1;
  return found ? index : await findIndexElement(elements, i + 1);
};
const getSubTilte = async (index, elements) => {
  const type = `HEADING_${index}`;
  if (Array.isArray(elements)) {
    let i_Hindex = elements.findIndex(
      (element) =>
        element.paragraph &&
        element.paragraph.paragraphStyle.namedStyleType === type
    );
    let i_sub = elements.findIndex(
      (element) =>
        element.paragraph &&
        element.paragraph.paragraphStyle.namedStyleType === SUBTITLE
    );
    if (i_Hindex > i_sub || index === -1) return elements[i_sub];
  } else {
    return;
  }
};
const getContent = async (
  index: number,
  elements: docs_v1.Schema$StructuralElement[]
) => {
  const type = `HEADING_${index}`;

  if (index == -1) {
    return elements.filter(
      (element) =>
        (element.paragraph &&
          element.paragraph.paragraphStyle.namedStyleType !== SUBTITLE) ||
        element.table
    );
  } else {
    let i_Hindex = elements.findIndex(
      (element) =>
        element.paragraph &&
        element.paragraph.paragraphStyle.namedStyleType === type
    );
    let elementsContent = elements
      .slice(0, i_Hindex)
      .filter(
        (element) =>
          (element.paragraph &&
            element.paragraph.paragraphStyle.namedStyleType !== SUBTITLE) ||
          element.table
      );
    return elementsContent;
  }
};
