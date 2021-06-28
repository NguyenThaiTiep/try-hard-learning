import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "../book/questions";
import { User } from "../user/user";

@Entity()
export class HistoryQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ManyToOne((type) => User, (user) => user.historyQuestions, { cascade: true })
  @JoinColumn()
  user: User;
  @ManyToOne((type) => Question, (question) => question.histories, {
    cascade: true,
  })
  @JoinColumn()
  question: Question;
  @Column({ nullable: true })
  answer: string;
  @Column({ default: 0 })
  score: number;
  @Column({ nullable: true })
  comment: string;
}
