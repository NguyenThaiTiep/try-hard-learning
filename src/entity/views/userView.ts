import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { User } from "../User";

@ViewEntity({
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select("user.id", "id")
      .addSelect("CONCAT(user.firstName,' ', user.lastName)", "name")
      .from(User, "user"),
})
export class UserView {
  @ViewColumn()
  id: number;
  @ViewColumn()
  name: string;
}
