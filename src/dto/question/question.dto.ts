import { SubQuestion } from "./subQuestion.dto";

export class QuestionInputGdocDto {
  introduct?: string;
  content: string;
  subQuestions?: SubQuestion[];
}
