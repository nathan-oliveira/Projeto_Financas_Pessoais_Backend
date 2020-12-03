import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { IsNotEmpty, IsEnum } from "class-validator";

import UserDAO from "./UserDAO";

@Entity("goals")
class GoalDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty({ message: "Descrição não pode ser vazio!" })
  public description: string;

  @Column({
    type: "enum",
    enum: ["receita", "despesa"],
  })
  @IsEnum(["receita", "despesa"], { message: "Tipo inválido!" })
  public types: string;

  @Column("decimal", { precision: 7, scale: 2 })
  @IsNotEmpty({ message: "Valor não pode ser vazio!" })
  public money: number;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  @ManyToOne((type: any) => UserDAO, (user: any) => user.id)
  @JoinColumn({ name: "userId" })
  public userId: UserDAO;

  // @OneToOne((type: any) => UserDAO)
  // @JoinColumn({ name: 'userId' })
  // public userId: UserDAO
}

export default GoalDAO;
