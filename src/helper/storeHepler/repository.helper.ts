import { EntityTarget, getRepository, Repository } from "typeorm";

import { StoreBook, StoreQuestion } from "../../settings/constant";

export function getRepositoryBookStore<Entity>(
  entityClass: EntityTarget<Entity>
) {
  return getRepository(entityClass, StoreBook) as Repository<Entity>;
}

export function getRepositoryQuestionStore<Entity>(
  entityClass: EntityTarget<Entity>
) {
  return getRepository(entityClass, StoreQuestion) as Repository<Entity>;
}
