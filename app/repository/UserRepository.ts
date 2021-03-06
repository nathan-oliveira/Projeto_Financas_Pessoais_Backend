import { EntityRepository, Repository } from "typeorm";
import { UserDAO } from "../models";
import AppError from "../config/AppError";

@EntityRepository(UserDAO)
class UserRepository extends Repository<UserDAO> {
  public async userExist(email: string): Promise<UserDAO[]> {
    return await this.manager.find(UserDAO, { where: { email } });
  }

  public async saveUser(user: object): Promise<UserDAO[] | object> {
    try {
      return await this.manager.save(UserDAO, user);
    } catch (err) {
      throw new AppError("Usuário já cadastrado.", 400);
    }
  }

  public async updated(userId: number, data: object): Promise<UserDAO[] | object> {
    return await this.manager.update(UserDAO, { id: userId }, data);
  }

  public async updateFoto(userId: number, foto: string): Promise<UserDAO[] | object> {
    return await this.manager.update(UserDAO, { id: userId }, {
      foto: foto
    });
  }

  public getUser(id: number): Promise<UserDAO[]> {
    return this.manager.find(UserDAO, { where: { id } });
  }
}

export default UserRepository;
