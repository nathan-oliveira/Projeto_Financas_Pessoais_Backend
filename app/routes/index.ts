import { AuthRouter } from "./AuthRouter"

export class IndexRouter {
  public authRouter: AuthRouter = new AuthRouter();

  public index(app: any) {
    return this.authRouter.routes(app);
  }
}
