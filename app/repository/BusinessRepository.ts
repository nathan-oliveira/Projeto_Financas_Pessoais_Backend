import { EntityRepository, Repository } from "typeorm";
import { BusinessDAO } from "../models";
import AppError from "../config/AppError";

@EntityRepository(BusinessDAO)
class BusinessRepository extends Repository<BusinessDAO> {
  public saveBusiness(business: object): Promise<object> {
    try {
      return this.manager.save(BusinessDAO, business);
    } catch (err) {
      throw new AppError("Não foi possível realizar o cadastro.", 400);
    }
  }

  public getAll(userId: number): Promise<BusinessDAO[]> {
    return this.manager.find(BusinessDAO, { where: { userId }, relations: ["categoryId"] });
  }

  public getById(userId: number, id: number): Promise<BusinessDAO[]> {
    return this.manager.find(BusinessDAO, { where: { id, userId }, relations: ["categoryId"] });
  }

  public async updated(userId: number, id: number, data: object): Promise<object> {
    await this.manager.update(BusinessDAO, { id, userId }, data);
    return { message: "Cadastro atualizado com sucesso!" };
  }

  public async deleted(userId: number, id: number): Promise<object> {
    await this.manager.delete(BusinessDAO, { userId, id });
    return { message: "Cadastro excluido com sucesso!" };
  }
}

export default BusinessRepository;
