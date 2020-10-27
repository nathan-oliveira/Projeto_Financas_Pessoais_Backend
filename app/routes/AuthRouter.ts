import { Router } from 'express';
import { AuthController } from '../controllers';
import Util from "../middlewares"

const routes = Router();

routes.post('/session', AuthController.prototype.login)
routes.post('/users', AuthController.prototype.create)
routes.get('/users/:id', Util.AuthVerify, AuthController.prototype.getUser)

export default routes;
