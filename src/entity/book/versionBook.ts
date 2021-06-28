import {
  Column,
  Entity,
  In,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./book";
import { Node } from "./node";
import { UserBook } from "./userBook";

@Entity()
@Index(["index", "book"])
export class VersionBook {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;

  @Column({ default: 1 })
  index: number;
  @ManyToOne((o) => Book, (book) => book.versions, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  book: Book;
  @OneToMany((o) => UserBook, (o) => o.version)
  @JoinColumn()
  userBooks: UserBook[];
  @OneToMany((type) => Node, (o) => o.version)
  @JoinColumn()
  nodes: Node[];
}
