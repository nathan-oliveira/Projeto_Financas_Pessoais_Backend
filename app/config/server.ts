import 'reflect-metadata';
import './env'
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import * as bp from 'body-parser';

import { Connection } from '../database';
import { IndexRouter } from '../routes';
import AppError from '../config/AppError';

class Server {
  private static connectDB(): Promise<any> {
    return Connection;
  }

  public app: express.Application;
  public routes: IndexRouter = new IndexRouter();

  constructor() {
    this.app = express();
    this.start();
    this.config();
    this.errors();
  }

  private async start(): Promise<any> {
    await Server.connectDB();
  }

  private config(): void {

    this.app.disable('x-powered-by');
    this.app.use(bp.urlencoded({ extended: true }));
    this.app.use(bp.json({ limit: '20mb' }));
    this.routes.index(this.app);
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

      console.log(err)

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    })
  }
}

export default new Server().app;
