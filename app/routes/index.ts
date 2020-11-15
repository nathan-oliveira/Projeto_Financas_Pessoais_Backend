import { AuthRouter } from "./AuthRouter"
import { CategoryRouter } from "./CategoryRouter"

export class IndexRouter {
  public authRouter: AuthRouter = new AuthRouter();
  public categoryRouter: CategoryRouter = new CategoryRouter();

  public index(app: Function) {
    this.authRouter.routes(app);
    this.categoryRouter.routes(app);
  }
}
