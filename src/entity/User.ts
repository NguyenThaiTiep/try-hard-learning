import { Entity, PrimaryGeneratedColumn, Column, AfterInsert } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
  @AfterInsert()
  afterInsertUser() {
    this.age = 1;
    this.lastName = "name";
  }
}
