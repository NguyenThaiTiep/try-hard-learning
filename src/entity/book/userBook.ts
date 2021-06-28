import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/user";
import { VersionBook } from "./versionBook";

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn()
  id: String;

  @ManyToOne((type) => User, (user) => user.userBooks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;
  @ManyToOne((type) => VersionBook, (o) => o.userBooks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  version: VersionBook;
}
