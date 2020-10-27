import { Router, Request, Response } from 'express';

import authRouter from "./AuthRouter"

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'API ON' });
})

routes.use('/', authRouter);


export default routes;
