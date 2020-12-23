import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import AppError from "../config/AppError";
import { BusinessDAO } from "../models";
import { BusinessRepository } from "../repository";

class BusinessService {
  static async save(dados: object): Promise<object> {
    const business = BusinessDAO.create(dados);
    const errors = await validate(business);

    if (errors.length > 0) throw new AppError("Todos os campos deve conter no mínimo 6 caracteres.", 400);
    return await getCustomRepository(BusinessRepository).saveBusiness(business);
  }

  static async getAll(userId: number): Promise<BusinessDAO[]> {
    return await getCustomRepository(BusinessRepository).getAll(userId);
  }

  static async getById(userId: number, id: number): Promise<BusinessDAO[]> {
    const business: BusinessDAO[] | undefined = await getCustomRepository(BusinessRepository).getById(userId, id);

    if (business.length === 0) throw new AppError("Meta não foi encontrada.", 400);
    return business;
  }

  static async updated(userId: number, id: number, data: object | any): Promise<BusinessDAO[] | object> {
    if (!data.description || !data.types || !data.money) return new AppError("Favor preencha todos os campos.", 400);
    await this.getById(userId, id);

    return await getCustomRepository(BusinessRepository).updated(userId, id, data);
  }

  static async deleted(userId: number, id: number): Promise<BusinessDAO[] | object> {
    await this.getById(userId, id);
    return await getCustomRepository(BusinessRepository).deleted(userId, id);
  }
}

export default BusinessService;
