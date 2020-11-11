import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm"

import {
  IsNotEmpty,
  Length
} from "class-validator";

@Entity('category')
export class CategoryDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @IsNotEmpty({ message: "Nome não pode ser vazio!" })
  @Length(6, 200, { message: "Nome deve conter entre 6 até 200 caracteres." })
  public name: string;

  @Column()
  @IsNotEmpty({ message: "Icone não pode ser vazio!" })
  @Length(6, 200, { message: "Icone deve conter entre 6 até 200 caracteres." })
  public icon: string;
}
