import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Grade } from "./grade";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  code: string;
  @Column()
  name: string;
  @ManyToMany((type) => Grade, (grade) => grade.subjects, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinTable()
  grades: Grade[];
}
