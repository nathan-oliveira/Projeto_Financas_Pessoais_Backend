import { Router, Request, Response } from 'express';

import authRouter from "./AuthRouter"
import categoryRouter from "./CategoryRouter"

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'API ON' });
})

routes
  .use('/', authRouter)
  .use('/', categoryRouter);

export default routes;
