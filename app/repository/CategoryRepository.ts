import { EntityRepository, Repository } from "typeorm";
import { CategoryDAO } from "../models"

@EntityRepository(CategoryDAO)
export class CategoryRepository extends Repository<CategoryDAO> {
  public saveCategory(name: string, icon: string): Promise<object> {
    return this.manager.save(CategoryDAO, { name, icon })
  }

  public getCategory(id: number): Promise<CategoryDAO[]> {
    return this.manager.find(CategoryDAO, { where: { id } });
  }
}
