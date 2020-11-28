import { Router } from "./Router"
import { AuthController } from "../controllers";
import Util from "../middlewares";

export class AuthRouter extends Router {
  constructor() {
    super(AuthController);
    this.router
      .post('/session', this.routes(AuthController.prototype.login))
      .post('/users', this.routes(AuthController.prototype.login))
      .get('/profile', Util.AuthVerify, this.routes(AuthController.prototype.profile))
      .post('/validarToken', Util.AuthVerify, this.routes(AuthController.prototype.validarToken));
  }
}

// export class AuthRouter {
//   public authController: AuthController = new AuthController();

//   public routes(app: any): void {
//     app.post('/session', this.authController.login)
//     app.post('/users', this.authController.create)
//     app.get('/profile', Util.AuthVerify, this.authController.profile)
//     app.post('/validarToken', Util.AuthVerify, this.authController.validarToken)
//   }
// }
