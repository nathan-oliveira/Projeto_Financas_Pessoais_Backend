import { getCustomRepository } from "typeorm";
import { CategoryDAO } from "../models";
import { CategoryRepository } from "../repository";

export class CategoryService {
  public save(name: string, icon: string): Promise<object> {
    return getCustomRepository(CategoryRepository).saveCategory(name, icon);
  }

  public getCategory(id: number): Promise<CategoryDAO[]> {
    return getCustomRepository(CategoryRepository).getCategory(id);
  }
}
