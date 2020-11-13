import { CategoryController } from "../controllers";
import Util from "../middlewares";

export class CategoryRouter {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: any) {
    app.post('/category', Util.AuthVerify, this.categoryController.create);
    app.get('/category', Util.AuthVerify, this.categoryController.getAll);
    app.get('/category/:id', Util.AuthVerify, this.categoryController.getById);
    app.put('/category/:id', Util.AuthVerify, this.categoryController.update);
    app.delete('/category/:id', Util.AuthVerify, this.categoryController.delete);
  }
}
