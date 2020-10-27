import 'reflect-metadata';
import './env'
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import * as bp from 'body-parser';

import '../database';
import routes from '../routes';
import AppError from '../config/AppError';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.errors();
  }

  private config(): void {
    this.app.disable('x-powered-by');
    this.app.use(bp.urlencoded({ extended: true }));
    this.app.use(bp.json({ limit: '20mb' }));
    this.app.use(routes);
    this.app.set('port', 4000);
  }

  private errors(): void {
    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          status: 'error',
          message: err.message
        })
      }

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    })
  }
}

export default new Server().app;
