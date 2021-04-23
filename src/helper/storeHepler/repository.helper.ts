import { getRepository, Repository } from "typeorm";

import { StoreBook, StoreQuestion } from "../../settings/constant";

export function getRepositoryBookStore(reponame) {
  return getRepository(reponame as any, StoreBook);
}
export const getRepositoryQuestionStore = (reponame: any) => {
  return getRepository(reponame, StoreQuestion);
};
