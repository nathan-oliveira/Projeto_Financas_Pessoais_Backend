import { Request, Response } from "express";
import { BusinessService } from "../services";
import Controller from "./Controller";

interface IBusiness {
  description: string;
  types: string;
  money: string;
  userId: number;
  categoryId: number;
}

class BusinessController extends Controller {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public async create(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };
    const dados = { ...this.req.body, userId } as IBusiness;

    console.log(this.req.body)

    try {
      const result = await BusinessService.save(dados);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }

  public async getAll(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };
    const result = await BusinessService.getAll(userId);

    return this.response({ statusCode: 200, body: result });
  }

  public async getById(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };
    const { id } = (this.req.params as unknown) as { id: number };

    const result = await BusinessService.getById(userId, id);
    return this.response({ statusCode: 200, body: result });
  }

  public async update(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };
    const { id } = (this.req.params as unknown) as { id: number };

    try {
      const result = await BusinessService.updated(userId, id, this.req.body);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }

  public async delete(): Promise<Response> {
    const { userId } = (this.req as unknown) as { userId: number };
    const { id } = (this.req.params as unknown) as { id: number };

    const result = await BusinessService.deleted(userId, id);
    return this.response({ statusCode: 200, body: result });
  }
}

export default BusinessController;
