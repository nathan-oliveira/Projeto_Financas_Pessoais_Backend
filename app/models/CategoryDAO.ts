import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from "typeorm"

@Entity('category')
export class CategoryDAO extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public icon: string;
}
