import { Response } from "express";
import { GoalService } from "../services/GoalService";
import { Controller } from "./Controller";

interface IGoal {
  description: string;
  types: string;
  money: string;
  userId: number;
}

export class GoalController extends Controller {
  public async create(): Promise<Response> {
    const { userId } = this.req as unknown as { userId: number };
    const dados = Object.assign({}, this.req.body, { userId }) as IGoal;

    try {
      const result = await GoalService.save(dados);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 200, body: err });
    }
  }

  public async getAll(): Promise<Response> {
    const { userId } = this.req as unknown as { userId: number };
    const result = await GoalService.getAll(userId);

    return this.response({ statusCode: 200, body: result });
  }

  public async getById(): Promise<Response> {
    const { userId } = this.req as unknown as { userId: number };
    const { id } = this.req.params as unknown as { id: number };

    const result = await GoalService.getById(userId, id);
    return this.response({ statusCode: 200, body: result });
  }

  public async update(): Promise<Response> {
    const { userId } = this.req as unknown as { userId: number };
    const { id } = this.req.params as unknown as { id: number };

    try {
      const result = await GoalService.updated(userId, id, this.req.body);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }

  public async delete(): Promise<Response> {
    const { userId } = this.req as unknown as { userId: number };
    const { id } = this.req.params as unknown as { id: number };

    const result = await GoalService.deleted(userId, id);
    return this.response({ statusCode: 200, body: result });
  }
}
