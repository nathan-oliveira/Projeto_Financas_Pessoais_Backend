import Router from "./Router";
import { GoalController } from "../controllers";
import Util from "../middlewares";

class GoalRouter extends Router {
  constructor() {
    super(GoalController);
    this.createRoutes();
  }

  public createRoutes(): void {
    this.router
      .post("/goal", Util.AuthVerify, this.routes(GoalController.prototype.create))
      .get("/goal", Util.AuthVerify, this.routes(GoalController.prototype.getAll))
      .get("/goal/:id", Util.AuthVerify, this.routes(GoalController.prototype.getById))
      .put("/goal/:id", Util.AuthVerify, this.routes(GoalController.prototype.update))
      .delete("/goal/:id", Util.AuthVerify, this.routes(GoalController.prototype.delete));
  }
}

export default GoalRouter;
