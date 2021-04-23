import { plainToClass } from "class-transformer";
import { getRepository, Repository } from "typeorm";
import { User } from "../../../entity/models/user/user";
import { getRepositoryBookStore } from "../../../helper/storeHepler/repository.helper";
import { mapTo } from "../../../untils/mapFunc";
import { userStatic } from "./staticData/user";

export const userLoader = async () => {
  const userRepo = (await getRepositoryBookStore(User)) as Repository<User>;
  try {
    let userElements = [] as User[];
    for (let userData of userStatic) {
      let user = await userRepo.findOne({ email: userData.email });
      let userInput = plainToClass(User, userData);
      userInput.passwordLength = userInput.password.length;
      userInput.isApproved = true;
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
