import { GoogleApis } from "googleapis";

import {
  client_email,
  private_key,
} from "../../libs/certifications/gsheet.json";
const google = new GoogleApis();
export const client = new google.auth.JWT({
  email: client_email,
  key: private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
export const pushDataElement = async () => {
  const sheetId = "1wkUUevh2rXqWnNroMIhACGtGw4Flb-ima-q2ASbRvxc";
  const gSheetApi = google.sheets({
    version: "v4",
    auth: client,
  });
  const data = await gSheetApi.spreadsheets.batchUpdate({
    spreadsheetId: sheetId,
    requestBody: {
      requests: [
        {
          updateCells: {
            fields: "*",
            range: {
              startColumnIndex: 1,
              endColumnIndex: 3,
              startRowIndex: 1,
              endRowIndex: 3,
            },
            rows: [
              {
                values: [
                  {
                    userEnteredValue: { stringValue: "Xin chào" },
                    textFormatRuns: [],
                  },
                  {
                    userEnteredValue: { stringValue: "Xin chào lần 2" },
                    textFormatRuns: [
                      {
                        format: {
                          underline: true,
                          bold: true,
                        },
                        startIndex: 0,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  });
  return data;
};
