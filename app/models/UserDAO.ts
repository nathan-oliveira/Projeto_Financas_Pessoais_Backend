import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from "typeorm";

import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity("users")
class UserDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty({ message: "Nome não pode ser vazio!" })
  @Length(6, 200, { message: "Nome deve conter entre 6 até 200 caracteres." })
  public name: string;

  @Column({ unique: true })
  @Length(6, 200, { message: "E-mail deve conter entre 6 até 200 caracteres." })
  @IsEmail({}, { message: "E-mail inválido!" })
  public email: string;

  @Column()
  @Length(6, 200, { message: "Senha deve conter entre 6 até 200 caracteres." })
  public password: string;

  @Column({ default: true })
  public active: boolean;

  @Column({ default: 0 })
  public nivel: number;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}

export default UserDAO;
