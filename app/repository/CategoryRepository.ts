import { EntityRepository, Repository } from "typeorm";
import { CategoryDAO } from "../models";
import AppError from '../config/AppError';

@EntityRepository(CategoryDAO)
export class CategoryRepository extends Repository<CategoryDAO> {
  public saveCategory(category: object): Promise<object> {
    try {
      return this.manager.save(CategoryDAO, category)
    } catch (err) {
      throw new AppError("Não foi possível realizar o Cadastro.", 400);
    }
  }

  public getAll(): Promise<CategoryDAO[]> {
    return this.manager.find(CategoryDAO)
  }

  public getById(id: number): Promise<CategoryDAO[]> {
    return this.manager.find(CategoryDAO, { where: { id } });
  }

  public async updated(id: number, data: object): Promise<object> {
    await this.manager.update(CategoryDAO, id, data);
    return { message: 'Categoria atualizada com sucesso!' }
  }

  public async deleted(id: number): Promise<object> {
    await this.manager.delete(CategoryDAO, { id });
    return { message: 'Categoria excluida com sucesso!' };
  }
}
