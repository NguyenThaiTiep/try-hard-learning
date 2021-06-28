import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  code: string;
  @Column({ default: false })
  createBook: boolean;
  @Column({ default: false })
  editBook: boolean;
  @Column({ default: false })
  activeUserBook: boolean;
  @Column({ default: false })
  removeBook: boolean;
  @Column({ default: false })
  createClass: boolean;
  @Column({ default: false })
  removeClass: boolean;
  @Column({ default: false })
  editClass: boolean;
  @Column({ default: false })
  updateRole: boolean;
  @Column({ default: false })
  viewUser: boolean;
  @Column({ default: false })
  blockUser: boolean;
  @Column({ default: false })
  editUser: boolean;
}
