import { Router } from "./Router"
import { CategoryController } from "../controllers";
import Util from "../middlewares";

export class CategoryRouter extends Router {
  constructor() {
    super(CategoryController);
    this.router
      .post('/category', Util.AuthVerify, this.routes(CategoryController.prototype.create))
      .get('/category', Util.AuthVerify, this.routes(CategoryController.prototype.getAll))
      .get('/category/:id', Util.AuthVerify, this.routes(CategoryController.prototype.getById))
      .put('/category/:id', Util.AuthVerify, this.routes(CategoryController.prototype.update))
      .delete('/category/:id', Util.AuthVerify, this.routes(CategoryController.prototype.delete));
  }
}

// export class CategoryRouter {
//   public categoryController: CategoryController = new CategoryController();

//   public routes(app: any): void {
//     app.post('/category', Util.AuthVerify, this.categoryController.create);
//     app.get('/category', Util.AuthVerify, this.categoryController.getAll);
//     app.get('/category/:id', Util.AuthVerify, this.categoryController.getById);
//     app.put('/category/:id', Util.AuthVerify, this.categoryController.update);
//     app.delete('/category/:id', Util.AuthVerify, this.categoryController.delete);
//   }
// }
