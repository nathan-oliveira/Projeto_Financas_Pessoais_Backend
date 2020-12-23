import "reflect-metadata";
import "./env";
import "express-async-errors";

import express, { Request, Response, NextFunction } from "express";
import * as bp from "body-parser";
import cors from "cors";

import Connection from "../database";
import IndexRouter from "../routes";
import AppError from "./AppError";

class Server {
  public app: express.Application;
  public routes: IndexRouter = new IndexRouter();

  constructor() {
    this.app = express();
    this.connection();
    this.requestCors();
    this.config();
    this.router();
    this.errors();
  }

  private connection(): void {
    Connection
      .then(async (resp) => {
        console.log('[+] Banco ON')
        return await Connection;
      })
      .catch(async (err) => {
        return console.log('[-] Banco OFF')
      })
  }

  private requestCors(): void {
    // const options: cors.CorsOptions = {
    //   allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    //   credentials: true,
    //   methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    //   origin: "http://localhost:8080",
    //   preflightContinue: false,
    // };

    this.app.use(cors());
  }

  private config(): void {
    this.app.disable("x-powered-by");
    this.app.use(bp.urlencoded({ extended: true }));
    this.app.use(bp.json({ limit: "20mb" }));
    this.app.set("port", 4000);
  }

  private router(): void {
    this.routes.index(this.app);
  }

  private errors(): void {
    this.app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({
          status: "error",
          message: err.message,
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });
  }
}

export default new Server().app;
