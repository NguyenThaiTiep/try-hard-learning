import { docs_v1 } from "googleapis";
import { getContentElement, getContentParagraph } from ".";
import { ImageDownLoad } from "../download/images";
/**
 *
 * @param table
 * @param images
 * @returns
 *  \begin{table}[]
 *  a & b & c \\
 *  b & c & e \\
 *  b & c & e
 * \end{table}
 *
 */
export const getContentTable = async (
  table: docs_v1.Schema$Table,
  images: ImageDownLoad[]
) => {
  let rowsContents = await Promise.all(
    table.tableRows.map(async (row) => await getContentRow(row, images))
  );
  let content = rowsContents.join(" \\\\ ");

  return ` \\begin{table}[] ${content} \\end{table} `;
};
const parseStyleTable = () => {};
/**
 * reutn
 */
const getContentRow = async (
  row: docs_v1.Schema$TableRow,
  images: ImageDownLoad[]
) => {
  let content = await Promise.all(
    row.tableCells.map(async (ceil) => {
      return await getContentCol(ceil, images);
    })
  );
  content = content.filter((i) => i);
  return content.join(" & ");
};
const getContentCol = async (
  ceil: docs_v1.Schema$TableCell,
  images: ImageDownLoad[]
) => {
  let content = await Promise.all(
    ceil.content.map(async (element) => {
      return await getContentParagraph(element.paragraph, images, true);
    })
  );
  if (content.length == 1 && content[0] == "") {
    return;
  }
  let text =
    content.join("") +
    " " +
    `\\col{${ceil.tableCellStyle.columnSpan}} \\row{${ceil.tableCellStyle.rowSpan}}`;
  text = text.replace("&", "\\0026");
  return text;
};
