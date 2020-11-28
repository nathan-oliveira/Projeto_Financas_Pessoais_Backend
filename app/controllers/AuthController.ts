import { Request, Response } from "express";
import { UserService } from "../services";
import { Controller } from "./Controller"
import Util from "../middlewares"

interface IUsers {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class AuthController extends Controller {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public async create(): Promise<Response> {
    const { name, email, password, password_confirmation } = this.req.body as IUsers;

    try {
      const result = await UserService.save(name, email, await Util.CreatePasswordHash(password, password_confirmation));
      return this.res.status(200).json(result);
    } catch (err) {
      return this.res.status(400).json(err);
    }
  }

  public async profile(): Promise<Response> {
    const { userId } = await this.req as unknown as { userId: number };
    const result = await UserService.getUser(userId)

    return this.res.status(200).json(result);
  }

  public async login(): Promise<Response | object> {
    const { email, password } = this.req.body as { email: string; password: string; };
    const result = await UserService.userExist(email, password);

    return this.res.status(200).json(await Util.ComparePasswordHash(password, result[0]));
  }

  public async validarToken() {
    return this.res.status(200).json({ error: false })
  }
}
