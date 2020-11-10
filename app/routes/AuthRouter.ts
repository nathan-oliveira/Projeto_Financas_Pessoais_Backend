import { Router } from "express";
import { AuthController } from "../controllers";
import Util from "../middlewares"

const routes = Router();

routes.post('/session', AuthController.login)
routes.post('/users', AuthController.create)
routes.get('/users/:id', Util.AuthVerify, AuthController.getUser)

export default routes;
