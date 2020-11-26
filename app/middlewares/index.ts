import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import AppError from '../config/AppError';

interface IJwT {
  id: number;
  name: string;
  email: string
}

interface IPayload {
  id: number;
  iat: number;
  exp: number
}

export default class Middlewares {
  static createToken(result: IJwT) {
    const token = jwt.sign({ id: result.id }, process.env.APP_SECRET || 'secret', {
      expiresIn: '1d'
    })

    return {
      name: result.name,
      email: result.email,
      token
    }
  }

  static async AuthVerify(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) throw new AppError("Token is required!", 400);

    const [, token] = authHeader.split(' ')

    try {
      const payload = await jwt.verify(token, process.env.APP_SECRET || 'secret') as IPayload;
      req.userId = payload.id;
      next()
    } catch (error) {
      throw new AppError("Token invalid!", 400);
    }
  }

  static async CreatePasswordHash(password: string, password_confirmation: string) {
    if(!password || password.length < 6) throw new AppError("Favor preencha todos os campos de cadastro.", 400);
    if(password !== password_confirmation) throw new AppError("O Campos Senha e Confirmar Senha devem ser iguais.", 400);

    return await bcrypt.hash(password, 8);
  }

  static async ComparePasswordHash(password: string, user: any) {
    if (!user) throw new AppError("Usuário e/ou senha inválidos.", 400);
    const compareUser = await bcrypt.compare(password, user.password);

    if (!compareUser) throw new AppError("Usuário e/ou senha inválidos.", 400);
    return this.createToken(user);
  }
}
