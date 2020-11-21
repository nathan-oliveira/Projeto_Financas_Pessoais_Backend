import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm"

import {
  IsNotEmpty,
  Length
} from "class-validator";

import { UserDAO } from "./UserDAO"

enum Roles {
  receita,
  despesa
}

@Entity('goals')
export class GoalDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public description: string;

  @Column({
    type: "enum",
    enum: ['receita', 'despesa']
  })
  public types: Roles;

  @Column("decimal", { precision: 7, scale: 2 })
  public money: number;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @ManyToOne((type: any) => UserDAO, (user: any) => user.id)
  @JoinColumn({ name: 'userId' })
  public userId: UserDAO;

  // @OneToOne((type: any) => UserDAO)
  // @JoinColumn({ name: 'userId' })
  // public userId: UserDAO
}
