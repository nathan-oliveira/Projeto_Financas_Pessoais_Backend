import { Request, Response } from "express";
import { CategoryService } from "../services";
import Controller from "./Controller";

interface ICategory {
  name: string;
  icon: string;
}

class CategoryController extends Controller {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  public async create(): Promise<Response> {
    const { name, icon } = this.req.body as ICategory;

    try {
      const result = await CategoryService.save(name, icon);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }

  public async getAll(): Promise<Response> {
    const result = await CategoryService.getAll();
    return this.response({ statusCode: 200, body: result });
  }

  public async getById(): Promise<Response> {
    const { id } = (this.req.params as unknown) as { id: number };
    const result = await CategoryService.getById(id);

    return this.response({ statusCode: 200, body: result });
  }

  public async update(): Promise<Response> {
    const { id } = (this.req.params as unknown) as { id: number };

    try {
      const result = await CategoryService.updated(id, this.req.body);
      return this.response({ statusCode: 200, body: result });
    } catch (err) {
      return this.response({ statusCode: 400, body: err });
    }
  }

  public async delete(): Promise<Response> {
    const { id } = (this.req.params as unknown) as { id: number };
    const result = await CategoryService.deleted(id);

    return this.response({ statusCode: 200, body: result });
  }
}

export default CategoryController;
