import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HistoryQuestion } from "../history/historyQuestion";
import { QuestionType } from "./question.type";
import { Section } from "./section";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  question_id: string;
  @ManyToOne((type) => Section, (o) => o.questions, { cascade: true })
  @JoinColumn()
  section: Section;
  @OneToMany((type) => HistoryQuestion, (o) => o.question)
  @JoinColumn()
  histories: HistoryQuestion[];
  @ManyToOne((type) => QuestionType)
  @JoinColumn()
  questionType: QuestionType;
  @Column()
  correctAnswer: string; 
}
