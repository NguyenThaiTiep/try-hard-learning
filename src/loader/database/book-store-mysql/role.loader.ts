import { plainToClass } from "class-transformer";
import { getRepository, Repository } from "typeorm";
import { Role } from "../../../entity/user/role";

import { getRepositoryBookStore } from "../../../helper/storeHepler/repository.helper";
import { mapTo } from "../../../untils/mapFunc";
import { roleStatic } from "./staticData/role";

export const roleLoader = async () => {
  try {
    const roleRepo = getRepository(Role);
    let roleElements = [] as Role[];
    for (let roleData of roleStatic) {
      let role = await roleRepo.findOne({ code: roleData.code });
      let roleInput = plainToClass(Role, roleData);
      if (role) {
        role = mapTo(role, roleInput);
      } else {
        role = roleInput;
      }
      roleElements.push(role);
    }
    await roleRepo.save(roleElements);
  } catch (e) {
    console.log(e);
  }
};
