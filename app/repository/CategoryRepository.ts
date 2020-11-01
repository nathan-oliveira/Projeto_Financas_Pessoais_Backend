import { EntityRepository, Repository } from "typeorm";
import { CategoryDAO } from "../models"

@EntityRepository(CategoryDAO)
export class CategoryRepository extends Repository<CategoryDAO> {
  public saveCategory(name: string, icon: string): Promise<object> {
    return this.manager.save(CategoryDAO, { name, icon })
  }

  public getAll(): Promise<CategoryDAO[]> {
    return this.manager.find(CategoryDAO)
  }

  public getById(id: number): Promise<CategoryDAO[]> {
    return this.manager.find(CategoryDAO, { where: { id } });
  }

  public updated(id: number, data: object): Promise<object> {
    return this.manager.update(CategoryDAO, id, data);
  }

  public async deleted(id: number): Promise<object> {
    return this.manager.delete(CategoryDAO, { id });
  }
}
