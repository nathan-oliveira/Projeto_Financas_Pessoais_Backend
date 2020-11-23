import { AuthController } from "../controllers";
import Util from "../middlewares";

export class AuthRouter {
  public authController: AuthController = new AuthController();

  public routes(app: any): void {
    app.post('/session', this.authController.login)
    app.post('/users', this.authController.create)
    app.get('/users/:id', Util.AuthVerify, this.authController.getUser)
    app.post('/validarToken', Util.AuthVerify, this.authController.validarToken)
  }
}
