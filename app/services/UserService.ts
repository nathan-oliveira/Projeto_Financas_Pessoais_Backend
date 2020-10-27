import { getCustomRepository } from "typeorm";
import { UserDAO } from "../models";
import { UserRepository } from "../repository";

export class UserService {
  public userExist(email: string): Promise<UserDAO[]> {
    return getCustomRepository(UserRepository).userExist(email);
  }

  public save(name: string, email: string, password: string): Promise<object> {
    return getCustomRepository(UserRepository).saveUser(name, email, password);
  }

  public getUser(id: number): Promise<UserDAO[]> {
    return getCustomRepository(UserRepository).getUser(id);
  }
}
