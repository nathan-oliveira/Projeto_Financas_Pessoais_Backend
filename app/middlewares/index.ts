import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

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

    if (!authHeader) return res.status(401).json({ message: 'Token is required!' })

    const [, token] = authHeader.split(' ')

    try {
      await jwt.verify(token, process.env.APP_SECRET || 'secret')
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid!' })
    }
  }
}
