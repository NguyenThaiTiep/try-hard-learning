import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { Role } from "../../entity/models/user/role";
import { mapTo } from "../../untils/mapFunc";
import { roleStatic } from "./staticData/role";

export const roleLoader = async () => {
  const roleRepo = await getRepository(Role);
  try {
    for (let roleData of roleStatic) {
      let role = await roleRepo.findOne({ code: roleData.code });
      let roleInput = plainToClass(Role, roleData);
      if (role) {
        role = mapTo(role, roleInput);
      } else {
        role = roleInput;
      }
      await roleRepo.save(role);
    }
  } catch (e) {
    console.log(e);
  }
};
