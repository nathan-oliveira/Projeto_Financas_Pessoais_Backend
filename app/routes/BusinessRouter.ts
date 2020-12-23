import Router from "./Router";
import { BusinessController } from "../controllers";
import Util from "../middlewares";

class BusinessRouter extends Router {
  constructor() {
    super(BusinessController);
    this.createRoutes();
  }

  public createRoutes(): void {
    this.router
      .post("/business", Util.AuthVerify, this.routes(BusinessController.prototype.create))
      .get("/business", Util.AuthVerify, this.routes(BusinessController.prototype.getAll))
      .get("/business/:id", Util.AuthVerify, this.routes(BusinessController.prototype.getById))
      .put("/business/:id", Util.AuthVerify, this.routes(BusinessController.prototype.update))
      .delete("/business/:id", Util.AuthVerify, this.routes(BusinessController.prototype.delete));
  }
}

export default BusinessRouter;
