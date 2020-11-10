import { getCustomRepository } from "typeorm";
import { CategoryDAO } from "../models";
import { CategoryRepository } from "../repository";

export class CategoryService {
  static save(name: string, icon: string): Promise<object> {
    return getCustomRepository(CategoryRepository).saveCategory(name, icon);
  }

  static getAll(): Promise<CategoryDAO[]> {
    return getCustomRepository(CategoryRepository).getAll();
  }

  static getById(id: number): Promise<CategoryDAO[]> {
    return getCustomRepository(CategoryRepository).getById(id);
  }

  static updated(id: number, data: object): Promise<any> {
    return getCustomRepository(CategoryRepository).updated(id, data);
  }

  static deleted(id: number): Promise<any> {
    return getCustomRepository(CategoryRepository).deleted(id);
  }
}
