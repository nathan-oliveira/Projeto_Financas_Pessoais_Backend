import AuthRouter from "./AuthRouter";
import CategoryRouter from "./CategoryRouter";
import GoalRouter from "./GoalRouter";

class IndexRouter {
  public authRouter: AuthRouter = new AuthRouter();

  public categoryRouter: CategoryRouter = new CategoryRouter();

  public goalRouter: GoalRouter = new GoalRouter();

  public index(app: any): any {
    app.use("/api", this.authRouter.router, this.categoryRouter.router, this.goalRouter.router);
  }
}

export default IndexRouter;
