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
  const gsheet_api = google.sheets({ version: "v4", auth: client });
  try {
    let otp = {};
    let data = await gdoc_api.documents.get({ documentId });
    return data;
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
export default { getData };
