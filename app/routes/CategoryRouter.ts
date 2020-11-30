import { Router } from "./Router"
import { CategoryController } from "../controllers";
import Util from "../middlewares";

export class CategoryRouter extends Router {
  public categoryController: CategoryController = CategoryController.prototype;

  constructor() {
    super(CategoryController);
    this.router
      .post('/category', Util.AuthVerify, this.routes(this.categoryController.create))
      .get('/category', Util.AuthVerify, this.routes(this.categoryController.getAll))
      .get('/category/:id', Util.AuthVerify, this.routes(this.categoryController.getById))
      .put('/category/:id', Util.AuthVerify, this.routes(this.categoryController.update))
      .delete('/category/:id', Util.AuthVerify, this.routes(this.categoryController.delete));
  }
}
