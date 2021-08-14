import { GoogleApis } from "googleapis";

import { client_email, private_key } from "../../libs/certifications/gdoc.json";

const google = new GoogleApis();
export const client = new google.auth.JWT({
  email: client_email,
  key: private_key,

  scopes: ["https://www.googleapis.com/auth/documents"],
});
const getData = async (url: string) => {
  const documentId = getId(url);
  if (!documentId) {
    return;
  }
  const gdoc_api = google.docs({ version: "v1", auth: client });
  try {
    let otp = {};
    let data = await gdoc_api.documents.get({ documentId });
    return data;
  } catch (e) {
    console.log(e);
    return;
  }
};
const writeDoc = async (id: string) => {
  const gdoc_api = google.docs({ version: "v1", auth: client });
  const gDriver = google.drive({ version: "v3", auth: client });
  try {
    let otp = {};

    // let data2 = await gdoc_api.documents.batchUpdate({
    //   documentId: id,
    //   requestBody: {
    //     requests: [
    //       {
    //         insertText: {
    //           location: {
    //             index: 1,
    //           },
    //           text: "$introduction1\n",
    //         },
    //       },
    //       {
    //         insertText: {
    //           location: {
    //             index: "$introduction2\n".length + 1,
    //           },
    //           text: "$introduction2\n",
    //         },
    //       },
    //       {
    //         updateParagraphStyle: {
    //           fields: "namedStyleType",
    //           range: {
    //             startIndex: 1,
    //             endIndex: "$introduction1\n$introduction2\n".length,
    //           },
    //           paragraphStyle: {
    //             namedStyleType: "Normal_Text",
    //           },
    //         },
    //       },
    //       {
    //         updateTextStyle: {
    //           range: {
    //             startIndex: "$introduction2\n".length + 1,
    //             endIndex: "$introduction1\n$introduction2\n".length,
    //           },
    //           fields: "italic",
    //           textStyle: {
    //             italic: true,
    //           },
    //         },
    //       },
    //       {
    //         updateTextStyle: {
    //           range: { endIndex: "$introduction1\n".length, startIndex: 1 },
    //           fields: "*",
    //           textStyle: {
    //             bold: true,
    //             underline: true,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });
    let dataDoc = await gdoc_api.documents.get({ documentId: id });
    // await gdoc_api.documents.batchUpdate({
    //   documentId: id,
    //   requestBody: {
    //     requests: [
    //       {
    //         deleteContentRange: {
    //           range: {
    //             startIndex: 1,
    //             endIndex: dataDoc.data.body.content.pop().endIndex - 1,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });
    // let data = await gdoc_api.documents.batchUpdate({
    //   documentId: id,
    //   requestBody: {
    //     requests: [
    //       {
    //         insertTable: {
    //           rows: 3,
    //           columns: 5,
    //           location: {
    //             index: 1,
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });
    // let data4 = await gdoc_api.documents.batchUpdate({
    //   documentId: id,
    //   requestBody: {
    //     requests: [
    //       {
    //         mergeTableCells: {
    //           tableRange: {
    //             columnSpan: 2,
    //             rowSpan: 1,

    //             tableCellLocation: {
    //               rowIndex: 0,
    //               columnIndex: 0,

    //               tableStartLocation: { index: 2 },
    //             },
    //           },
    //         },
    //       },
    //       {
    //         mergeTableCells: {
    //           tableRange: {
    //             columnSpan: 1,
    //             rowSpan: 2,

    //             tableCellLocation: {
    //               rowIndex: 1,
    //               columnIndex: 0,

    //               tableStartLocation: { index: 2 },
    //             },
    //           },
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "cột 12",
    //           location: { index: 5 },
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "\n",
    //           location: { index: 5 + "cột 12".length + 2 }, //13
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "cột 2",
    //           location: { index: 13 + "\n".length + 2 }, //16
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "cột 23",
    //           location: { index: 16 + "cột 2".length + 2 }, //23
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "cột 2",
    //           location: { index: 23 + "cột 23".length + 2 }, //30
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 2",
    //           location: { index: 31 + "cột 2".length + 2 + 1 }, //38
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 2",
    //           location: { index: 39 + "hàng 2".length + 2 }, //46
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 2",
    //           location: { index: 47 + "hàng 2".length + 2 }, //54
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 2",
    //           location: { index: 55 + "hàng 2".length + 2 }, //62
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 2",
    //           location: { index: 63 + "hàng 2".length + 2 }, //70
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "\n",
    //           location: { index: 71 + "hàng 2".length + 2 + 1 }, //79
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 3",
    //           location: { index: 80 + "\n".length + 2 }, //82
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 3",
    //           location: { index: 83 + "hàng 3".length + 2 }, //90
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 3",
    //           location: { index: 91 + "hàng 3".length + 2 }, //98
    //         },
    //       },
    //       {
    //         insertText: {
    //           text: "hàng 3",
    //           location: { index: 99 + "hàng 3".length + 2 }, //98
    //         },
    //       },
    //     ],
    //   },
    // });
    // console.log("\n".length);

    // let data = await gdoc_api.documents.batchUpdate({
    //   documentId: id,
    //   requestBody: {
    //     requests: [
    //       {
    //         insertText: {
    //           location: {
    //             index: 1,
    //           },
    //           text: "<content>\n",
    //         },
    //       },
    //       {
    //         updateParagraphStyle: {
    //           fields: "namedStyleType",
    //           range: {
    //             startIndex: 1,
    //             endIndex: "<content>".length + 1,
    //           },
    //           paragraphStyle: {
    //             namedStyleType: "HEADING_5",
    //           },
    //         },
    //       },
    //     ],
    //   },
    // });

    return dataDoc.data.body.content;
  } catch (e) {
    console.log(e);
    return;
  }
};
const getId = (url: string) => {
  let id;
  if (url)
    url.replace(/\/d\/(.*)\/edit/, (text, val) => {
      id = val;
      return text;
    });
  return id;
};
export default { getData, writeDoc };
