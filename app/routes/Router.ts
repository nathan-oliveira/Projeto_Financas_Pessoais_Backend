import * as express from "express";

abstract class Router {
  public router: express.Router;

  private controller: any;

  constructor(controller: any) {
    this.controller = controller;
    this.router = express.Router();
  }

  protected routes(action: () => void): any {
    return (req: express.Request, res: express.Response) => {
      return action.call(new this.controller(req, res));
    };
  }
}

export default Router;
