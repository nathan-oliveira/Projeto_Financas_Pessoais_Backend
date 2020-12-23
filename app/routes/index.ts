import AuthRouter from "./AuthRouter";
import CategoryRouter from "./CategoryRouter";
import GoalRouter from "./GoalRouter";
import BusinessRouter from "./BusinessRouter";

class IndexRouter {
  public authRouter: AuthRouter = new AuthRouter();
  public categoryRouter: CategoryRouter = new CategoryRouter();
  public goalRouter: GoalRouter = new GoalRouter();
  public businessRouter: BusinessRouter = new BusinessRouter();

  public index(app: any): any {
    app.use("/api", this.authRouter.router, this.categoryRouter.router, this.goalRouter.router, this.businessRouter.router);
  }
}

export default IndexRouter;
