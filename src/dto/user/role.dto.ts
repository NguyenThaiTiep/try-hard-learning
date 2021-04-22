import { Expose } from "class-transformer";
@Expose()
export class RoleInit {
  @Expose()
  id?: number;
  @Expose()
  @Expose()
  name: string;
  @Expose()
  @Expose()
  code: string;
  @Expose()
  createBook: boolean;
  @Expose()
  editBook: boolean;
  @Expose()
  activeUserBook: boolean;
  @Expose()
  removeBook: boolean;
  @Expose()
  createClass: boolean;
  @Expose()
  removeClass: boolean;
  @Expose()
  editClass: boolean;
  @Expose()
  updateRole: boolean;
  @Expose()
  viewUser: boolean;
  @Expose()
  blockUser: boolean;
  @Expose()
  editUser: boolean;
}
