import { Request, Response } from "express";
import { UserService } from "../services";
import Util from "../middlewares"

import * as bcrypt from "bcrypt";

interface IUsers {
  name: string;
  email: string;
  password: string;
}

export class AuthController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body as IUsers;
    const passwordHash = await bcrypt.hash(req.body.password, 8);

    const userExist = await UserService.prototype.userExist(email)

    if (userExist[0]) return res.status(422).json({ message: "Usuário já cadastrado." });

    if (!name || !email || !password) return res.status(422).json({ message: "Favor preencha todos os campos de cadastro." })

    try {
      const result = await UserService.prototype.save(name, email, passwordHash);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ message: "Não foi possível realizar o Cadastro." });
    }
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };

    try {
      const result = await UserService.prototype.getUser(id)
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as { email: string; password: string; };

    if (!email || !password) return res.status(422).json({ message: "Favor preencha todos os campos de cadastro." })

    const result = await UserService.prototype.userExist(email);

    if (result.length === 1) {
      if (await bcrypt.compare(password, result[0].password)) {
        return res.json(Util.createToken(result[0]));
      } else {
        return res.status(404).json({ message: "Usuário não encontrado." })
      }
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }
  }

}
