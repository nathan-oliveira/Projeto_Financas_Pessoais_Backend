import { Router } from "express";
import { CategoryController } from "../controllers";
import Util from "../middlewares"

const routes = Router();

routes.post('/category', Util.AuthVerify, CategoryController.create);
routes.get('/category', Util.AuthVerify, CategoryController.getAll);
routes.get('/category/:id', Util.AuthVerify, CategoryController.getById);
routes.put('/category/:id', Util.AuthVerify, CategoryController.update);
routes.delete('/category/:id', Util.AuthVerify, CategoryController.delete);

export default routes;
