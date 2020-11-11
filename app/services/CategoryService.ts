import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import AppError from "../config/AppError";
import { CategoryDAO } from "../models";
import { CategoryRepository } from "../repository";

export class CategoryService {
  static async save(name: string, icon: string): Promise<object> {
    const category = CategoryDAO.create({ name, icon });
    const errors = await validate(category);

    if (errors.length > 0) return errors.map(v => v.constraints);
    return await getCustomRepository(CategoryRepository).saveCategory(category);
  }

  static async getAll(): Promise<CategoryDAO[]> {
    return await getCustomRepository(CategoryRepository).getAll();
  }

  static async getById(id: number): Promise<CategoryDAO[]> {
    const category = await getCustomRepository(CategoryRepository).getById(id);

    if (category.length === 0) throw new AppError("Categoria não encontrada.", 400);
    return category;
  }

  static async updated(id: number, data: object): Promise<CategoryDAO[] | object> {
    return await getCustomRepository(CategoryRepository).updated(id, data);
  }

  static async deleted(id: number): Promise<any> {
    return await getCustomRepository(CategoryRepository).deleted(id);
  }
}
