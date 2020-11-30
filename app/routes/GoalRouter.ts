import { Router } from "./Router";
import { GoalController } from "../controllers";
import Util from "../middlewares";

export class GoalRouter extends Router {
  public goalController: GoalController = GoalController.prototype;

  constructor() {
    super(GoalController);
    this.router
      .post('/goal', Util.AuthVerify, this.routes(this.goalController.create))
      .get('/goal', Util.AuthVerify, this.routes(this.goalController.getAll))
      .get('/goal/:id', Util.AuthVerify, this.routes(this.goalController.getById))
      .put('/goal/:id', Util.AuthVerify, this.routes(this.goalController.update))
      .delete('/goal/:id', Util.AuthVerify, this.routes(this.goalController.delete))
  }
}
