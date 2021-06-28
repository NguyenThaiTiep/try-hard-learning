import { Column, Entity, Index, ObjectIdColumn } from "typeorm";

@Entity()
@Index(["bookId"])
@Index(["sectionId"])
@Index(["path"])
@Index(["type"])
export class QuestionModel {
  @ObjectIdColumn()
  id: string;
  @Column()
  intruction: string;
  @Column({ nullable: true })
  type: string;
  @Column()
  correctAnwer: string;
  @Column()
  bookId: string;
  @Column()
  sectionId: string;
  @Column()
  path: string;
}
