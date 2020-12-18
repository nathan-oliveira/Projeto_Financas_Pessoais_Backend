import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import AppError from "../config/AppError";
import { UserDAO } from "../models";
import { UserRepository } from "../repository";

interface IUser {
  name: string;
  email: string;
  active: boolean;
}

class UserService {
  static async userExist(email: string, password: string): Promise<UserDAO[]> {
    if (!email || !password) throw new AppError("Favor preencha todos os campos de cadastro.", 400);
    return await getCustomRepository(UserRepository).userExist(email);
  }

  static async save(name: string, email: string, password: string): Promise<UserDAO[] | object> {
    if (!name || !email || !password) throw new AppError("Favor preencha todos os campos de cadastro.", 400);

    const user = UserDAO.create({ name, email, password });
    const errors = await validate(user);

    if (errors.length > 0) throw new AppError("Todos os campos deve conter no mínimo 6 caracteres.", 400);
    return getCustomRepository(UserRepository).saveUser(user);
  }

  static async updated(userId: number, data: object | any): Promise<UserDAO[] | object> {
    if (!data.email || !data.name) throw new AppError("Favor preencha todos os campos de cadastro.", 400);
    delete data.password_confirmation;
    await this.getUser(userId);

    const updateUsuario = await getCustomRepository(UserRepository).updated(userId, data);
    if (updateUsuario.raw.affectedRows !== 1) throw new AppError("Não foi possível atualizar o usuário.", 400);
    return await this.getUser(userId);
  }

  static async getUser(id: number): Promise<UserDAO[] | object> {
    const user = await getCustomRepository(UserRepository).getUser(id);
    if (user.length === 0) throw new AppError("Usuário não encontrado.", 400);

    return {
      name: user[0].name,
      email: user[0].email,
      active: user[0].active,
      nivel: user[0].nivel,
    } as IUser;
  }
}

export default UserService;
