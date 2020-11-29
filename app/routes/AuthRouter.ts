import { Router } from "./Router"
import { AuthController } from "../controllers";
import Util from "../middlewares";

export class AuthRouter extends Router {
  constructor() {
    super(AuthController);
    this.router
      .post('/session', this.routes(AuthController.prototype.login))
      .post('/users', this.routes(AuthController.prototype.create))
      .get('/profile', Util.AuthVerify, this.routes(AuthController.prototype.profile))
      .post('/validarToken', Util.AuthVerify, this.routes(AuthController.prototype.validarToken));
  }
}
