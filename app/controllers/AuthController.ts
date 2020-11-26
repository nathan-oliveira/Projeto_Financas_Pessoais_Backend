import { Request, Response } from "express";
import { UserService } from "../services";
import Util from "../middlewares"

interface IUsers {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class AuthController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, password_confirmation } = req.body as IUsers;

    try {
      const result = await UserService.save(name, email, await Util.CreatePasswordHash(password, password_confirmation));
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  public async profile(req: Request, res: Response): Promise<Response> {
    const result = await UserService.getUser(req.userId)

    return res.status(200).json(result);
  }

  public async login(req: Request, res: Response): Promise<Response | object> {
    const { email, password } = req.body as { email: string; password: string; };
    const result = await UserService.userExist(email, password);

    return res.status(200).json(await Util.ComparePasswordHash(password, result[0]));
  }

  public async validarToken(req: Request, res: Response) {
    return res.status(200).json({ error: false })
  }
}
