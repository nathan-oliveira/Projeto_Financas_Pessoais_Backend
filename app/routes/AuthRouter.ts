import { Router } from "./Router"
import { AuthController } from "../controllers";
import Util from "../middlewares";

export class AuthRouter extends Router {
  public authController: AuthController = AuthController.prototype;

  constructor() {
    super(AuthController);
    this.router
      .post('/session', this.routes(this.authController.login))
      .post('/users', this.routes(this.authController.create))
      .put('/users', Util.AuthVerify, this.routes(this.authController.update))
      .get('/profile', Util.AuthVerify, this.routes(this.authController.profile))
      .post('/validarToken', Util.AuthVerify, this.routes(this.authController.validarToken));
  }
}
