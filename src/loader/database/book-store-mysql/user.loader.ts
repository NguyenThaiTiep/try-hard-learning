import { plainToClass } from "class-transformer";
import { getRepository, Repository } from "typeorm";
import { Role } from "../../../entity/user/role";
import { User } from "../../../entity/user/user";

import { getRepositoryBookStore } from "../../../helper/storeHepler/repository.helper";
import { mapTo } from "../../../untils/mapFunc";
import { userStatic } from "./staticData/user";

export const userLoader = async () => {
  const userRepo = getRepository(User);
  const roleRepo = getRepository(Role);
  try {
    let userElements = [] as User[];
    for (let userData of userStatic) {
      let user = await userRepo.findOne({
        where: { email: userData.email },
        relations: ["role"],
      });
      let userInput = plainToClass(User, userData);
      userInput.passwordLength = userInput.password.length;
      userInput.isApproved = true;
      let role = await roleRepo.findOne({ code: userData.roleCode });

      userInput.role = role;
      if (user) {
        user = mapTo(user, userInput);
      } else {
        user = userInput;
      }
      userElements.push(user);
    }
    await userRepo.save(userElements);
  } catch (e) {
    console.log(e);
  }
};
