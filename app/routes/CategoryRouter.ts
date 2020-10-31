import { Router } from "express";
import { CategoryController } from "../controllers";
import Util from "../middlewares"

const routes = Router();

routes.post('/category', Util.AuthVerify, CategoryController.prototype.create);
routes.get('/category/:id', Util.AuthVerify, CategoryController.prototype.getCategoryId);

export default routes;
