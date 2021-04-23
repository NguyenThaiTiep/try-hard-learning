import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Section } from "./section";
import { VersionBook } from "./versionBook";

@Entity()
@Index(["type", "version"])
export class Node {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  title: string;
  @Column()
  type: string;
  @ManyToOne((type) => VersionBook, (o) => o.nodes, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  version: VersionBook;
  @OneToMany((type) => Section, (o) => o.node)
  @JoinColumn()
  sections: Section[];
}
