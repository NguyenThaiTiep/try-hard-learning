import { Request, Response } from "../../helper/apiHelper";
import { handleResponse } from "../../helper/apiHelper/response.helper";
import gDocApi from "../../service/google-api/g-doc-api";

import { converter, NodeInterFace } from "../../helper/gdocHelper";
import { node } from "webpack";
import { Question } from "../../entity/book/questions";

const updateQuestionsDoc = async (req, res) => {
  try {
    const url = req.body.url;

    const document = await gDocApi.getData(url);

    const dataSection = await converter(document.data);

    let questionSections = await Promise.all(
      dataSection.map(async (section) => await getDataSection(section))
    );
    const questions = questionSections.reduce((a, b) => a.concat(b));

    if (document.status !== 200) {
      return handleResponse(res, 400);
    }

    return handleResponse(res, 200, { data: { questions } });
  } catch (e) {
    console.log(e);
    return handleResponse(res, 400);
  }
};
const getDataSection = async (node: NodeInterFace) => {
  if (node.questions) return node.questions;
  let questions = [] as Question[];
  let questionsChild = await Promise.all(
    node.childs.map(async (i) => await getDataSection(i))
  );
  questions = questionsChild.reduce((a, b) => a.concat(b));
  return questions;
};

export const QuestionAdminController = { updateQuestionsDoc };
