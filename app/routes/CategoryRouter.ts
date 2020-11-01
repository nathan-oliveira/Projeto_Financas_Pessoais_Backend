import { Router } from "express";
import { CategoryController } from "../controllers";
import Util from "../middlewares"

const routes = Router();

routes.post('/category', Util.AuthVerify, CategoryController.prototype.create);
routes.get('/category', Util.AuthVerify, CategoryController.prototype.getAll);
routes.get('/category/:id', Util.AuthVerify, CategoryController.prototype.getById);
routes.put('/category/:id', Util.AuthVerify, CategoryController.prototype.update);
routes.delete('/category/:id', Util.AuthVerify, CategoryController.prototype.delete);

export default routes;
