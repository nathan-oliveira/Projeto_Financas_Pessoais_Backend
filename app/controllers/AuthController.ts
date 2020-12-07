import { Response } from "express";
import { UserService } from "../services";
import Controller from "./Controller";
import Util from "../middlewares";

interface IUsers {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

class AuthController extends Controller {
  public async create(): Promise<Response> {
    const { name, email, password, password_confirmation } = this.req.body as IUsers;

    try {
      const result = await UserService.save(name, email, await Util.CreatePasswordHash(password, password_confirmation));
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }

  public async profile(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };
    const result = await UserService.getUser(userId);

    return this.response({ statusCode: 200, body: result });
  }

  public async login(): Promise<Response> {
    const { email, password } = this.req.body as { email: string; password: string };
    const user = await UserService.userExist(email, password);
    const result = await Util.ComparePasswordHash(password, user[0]);

    return this.response({ statusCode: 200, body: result });
  }

  public async update(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };

    if (this.req.body.password) {
      const { password, password_confirmation } = this.req.body;
      this.req.body.password = await Util.CreatePasswordHash(password, password_confirmation);
    }

    try {
      const result = await UserService.updated(userId, this.req.body);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }

  public async validarToken() {
    const result = { error: false };
    return this.response({ statusCode: 200, body: result });
  }
}

export default AuthController;
