import { getCustomRepository } from "typeorm";
import { CategoryDAO } from "../models";
import { CategoryRepository } from "../repository";

export class CategoryService {
  public save(name: string, icon: string): Promise<object> {
    return getCustomRepository(CategoryRepository).saveCategory(name, icon);
  }

  public getAll(): Promise<CategoryDAO[]> {
    return getCustomRepository(CategoryRepository).getAll();
  }

  public getById(id: number): Promise<CategoryDAO[]> {
    return getCustomRepository(CategoryRepository).getById(id);
  }

  public updated(id: number, data: object): Promise<any> {
    return getCustomRepository(CategoryRepository).updated(id, data);
  }

  public deleted(id: number): Promise<any> {
    return getCustomRepository(CategoryRepository).deleted(id);
  }
}
