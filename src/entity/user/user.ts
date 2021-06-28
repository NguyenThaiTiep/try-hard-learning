import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserBook } from "../book/userBook";
import { HistoryQuestion } from "../history/historyQuestion";
import { Role } from "./role";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  birthDay: Date;
  @Column()
  password: string;
  @Column({ nullable: true, default: 0 })
  passwordLength: number;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
  @Column({ default: false })
  isBlock: boolean;
  @ManyToOne((o) => Role)
  @JoinColumn()
  role: Role;
  @Column({ default: false })
  isApproved: boolean;
  @OneToMany((type) => UserBook, (o) => o.user)
  @JoinColumn()
  userBooks: UserBook[];
  @OneToMany((type) => HistoryQuestion, (o) => o.user)
  @JoinColumn()
  historyQuestions: HistoryQuestion[];
}
