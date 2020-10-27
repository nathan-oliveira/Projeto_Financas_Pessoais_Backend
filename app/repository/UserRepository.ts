import { EntityRepository, Repository } from "typeorm";
import { UserDAO } from "../models";

@EntityRepository(UserDAO)
export class UserRepository extends Repository<UserDAO> {
  public userExist(email: string): Promise<UserDAO[]> {
    return this.manager.find(UserDAO, { where: { email } })
  }

  public saveUser(name: string, email: string, password: string): Promise<object> {
    return this.manager.save(UserDAO, { name, email, password })
  }

  public getUser(id: number): Promise<UserDAO[]> {
    return this.manager.find(UserDAO, { where: { id } });
  }
}
