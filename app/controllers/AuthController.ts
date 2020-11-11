import { Request, Response } from "express";
import { UserService } from "../services";
import Util from "../middlewares"

interface IUsers {
  name: string;
  email: string;
  password: string;
}

export class AuthController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body as IUsers;
    const result = await UserService.save(name, email, await Util.CreatePasswordHash(password));

    return res.status(200).json(result);
  }

  static async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };

    const result = await UserService.getUser(id)
    return res.status(200).json(result);
  }

  static async login(req: Request, res: Response): Promise<Response | object> {
    const { email, password } = req.body as { email: string; password: string; };
    const result = await UserService.userExist(email, password);

    return res.status(200).json(await Util.ComparePasswordHash(password, result[0]));
  }
}
