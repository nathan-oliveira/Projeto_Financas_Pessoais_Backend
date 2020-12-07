import Router from "./Router";
import { AuthController } from "../controllers";
import Util from "../middlewares";

class AuthRouter extends Router {
  constructor() {
    super(AuthController);
    this.createRoutes();
  }

  public createRoutes(): void {
    this.router
      .post("/session", this.routes(AuthController.prototype.login))
      .post("/users", this.routes(AuthController.prototype.create))
      .put("/users", Util.AuthVerify, this.routes(AuthController.prototype.update))
      .get("/profile", Util.AuthVerify, this.routes(AuthController.prototype.profile))
      .post("/validarToken", Util.AuthVerify, this.routes(AuthController.prototype.validarToken));
  }
}

export default AuthRouter;
