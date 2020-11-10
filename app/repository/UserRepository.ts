import { EntityRepository, Repository } from "typeorm";
import { UserDAO } from "../models";

@EntityRepository(UserDAO)
export class UserRepository extends Repository<UserDAO> {
  public userExist(email: string): Promise<UserDAO[]> {
    return this.manager.find(UserDAO, { where: { email } })
  }

  public async saveUser(user: object): Promise<UserDAO[] | object> {
    try {
      return await this.manager.save(UserDAO, user);
    } catch (error) {
      throw { message: "Usuário já cadastrado." };
    }

  }

  public getUser(id: number): Promise<UserDAO[]> {
    return this.manager.find(UserDAO, { where: { id } });
  }
}
