import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Node } from "./node";
import { Question } from "./questions";

@Entity()
export class Section {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  intruction: string;
  @Column()
  groupContent: string;
  @Column()
  score: number;
  @Column()
  css: string;
  @ManyToOne((type) => Node, (o) => o.sections)
  @JoinColumn()
  node: Node;
  @OneToMany((type) => Question, (o) => o.section)
  @JoinColumn()
  questions: Question[];
}
