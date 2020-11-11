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
    const category = await this.manager.update(CategoryDAO, id, data);

    if (category.affected === 0) throw new AppError("Não foi possível atualizar a categoria.", 400);
    return { message: 'Categoria atualizada com sucesso!' }
  }

  public async deleted(id: number): Promise<object> {
    const category = await this.manager.delete(CategoryDAO, { id });

    if (category.affected === 0) throw new AppError("Não foi possível excluir a categoria.", 400);
    return { message: 'Categoria excluida com sucesso!' };
  }
}
