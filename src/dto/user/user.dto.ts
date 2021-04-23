import { Expose } from "class-transformer";
@Expose()
export class UserInputDto {
  @Expose()
  email: string;
  @Expose()
  name: string;
  @Expose()
  birthDay?: Date;
  @Expose()
  password: string;
  @Expose()
  roleCode: string;
}
