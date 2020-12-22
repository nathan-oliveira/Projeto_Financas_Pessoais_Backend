import { Request, Response } from "express";
import { BusinessService } from "../services";
import Controller from "./Controller";

interface IBusiness {
  description: string;
  types: string;
  money: string;
  userId: number;
  goalId: number;
}

class BusinessController extends Controller {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public async create(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };
    const dados = { ...this.req.body, userId } as IBusiness;

    try {
      const result = await BusinessService.save(dados);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }
}

export default BusinessService;
