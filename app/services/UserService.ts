import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";
import { UserDAO } from "../models";
import { UserRepository } from "../repository";

export class UserService {
  static async userExist(email: string, password: string): Promise<UserDAO[]> {
    if (!email || !password) throw { message: "Favor preencha todos os campos de cadastro." };
    return await getCustomRepository(UserRepository).userExist(email);
  }

  static async save(name: string, email: string, password: string): Promise<UserDAO[] | object> {
    const user = UserDAO.create({ name, email, password });
    const errors = await validate(user);

    if (errors.length > 0) return errors.map(v => v.constraints);
    return getCustomRepository(UserRepository).saveUser(user);
  }

  static async getUser(id: number): Promise<UserDAO[]> {
    const user = await getCustomRepository(UserRepository).getUser(id);
    if (user.length === 0) throw { message: "Usuário não encontrado." };
    return user;
  }
}
