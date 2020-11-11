import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

import AppError from '../config/AppError';

interface IJwT {
  id: number;
  name: string;
  email: string
}

export default class Middlewares {
  static createToken(result: IJwT) {
    const token = jwt.sign({ id: result.id }, process.env.APP_SECRET || 'secret', {
      expiresIn: '1d'
    })

    return {
      id: result.id,
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
      await jwt.verify(token, process.env.APP_SECRET || 'secret')
      next()
    } catch (error) {
      throw new AppError("Token invalid!", 400);
    }
  }

  static async CreatePasswordHash(password: string) {
    return await bcrypt.hash(password, 8);
  }

  static async ComparePasswordHash(password: string, user: any) {
    if (!user) throw new AppError("Usuário e/ou senha inválidos.", 400);
    const compareUser = await bcrypt.compare(password, user.password);

    if (!compareUser) throw new AppError("Usuário e/ou senha inválidos.", 400);
    return this.createToken(user);
  }
}
