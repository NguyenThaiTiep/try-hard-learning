import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Subject } from "./subject";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  code: string;
  @ManyToMany((type) => Subject, (subject) => subject.grades, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  subjects: Subject[];
}
