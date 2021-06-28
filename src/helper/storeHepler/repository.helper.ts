import { EntitySchema, getRepository, ObjectType, Repository } from "typeorm";

import { StoreQuestion } from "../../settings/constant";

export function getRepositoryBookStore<Entity>(
  entityClass: ObjectType<Entity> | EntitySchema<Entity> | string,
  connectionName = "default"
) {
  return getRepository(entityClass, connectionName) as Repository<Entity>;
}
