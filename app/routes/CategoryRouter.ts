import Router from "./Router";
import { CategoryController } from "../controllers";
import Util from "../middlewares";

class CategoryRouter extends Router {
  constructor() {
    super(CategoryController);
    this.createRoutes();
  }

  public createRoutes(): void {
    this.router
      .post("/category", Util.AuthVerify, this.routes(CategoryController.prototype.create))
      .get("/category", Util.AuthVerify, this.routes(CategoryController.prototype.getAll))
      .get("/category/:id", Util.AuthVerify, this.routes(CategoryController.prototype.getById))
      .put("/category/:id", Util.AuthVerify, this.routes(CategoryController.prototype.update))
      .delete("/category/:id", Util.AuthVerify, this.routes(CategoryController.prototype.delete));
  }
}

export default CategoryRouter;
