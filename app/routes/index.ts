import { AuthRouter } from "./AuthRouter"
import { CategoryRouter } from "./CategoryRouter"

export class IndexRouter {
  public authRouter: AuthRouter = new AuthRouter();
  public categoryRouter: CategoryRouter = new CategoryRouter();

  public index(app: any) {
    app.use(this.authRouter.router);
    app.use(this.categoryRouter.router);
  }
}

