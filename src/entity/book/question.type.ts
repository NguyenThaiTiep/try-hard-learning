import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class QuestionType {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;
  @Column()
  code: string;
}
