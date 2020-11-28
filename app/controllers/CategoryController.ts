import { Request, Response } from "express";
import { CategoryService } from "../services"
import { Controller } from "./Controller"

export class CategoryController extends Controller {
  public async create(): Promise<Response> {
    const { name, icon } = this.req.body;

    try {
      const result = await CategoryService.save(name, icon);
      return this.res.status(200).json(result);
    } catch (err) {
      return this.res.status(400).json(err);
    }
  }

  public async getAll(): Promise<Response> {
    const result = await CategoryService.getAll();
    return this.res.status(200).json(result);
  }

  public async getById(): Promise<Response> {
    const { id } = this.req.params as unknown as { id: number };
    const result = await CategoryService.getById(id)

    return this.res.status(200).json(result)
  }

  public async update(): Promise<Response | object> {
    const { id } = this.req.params as unknown as { id: number };

    try {
      const result = await CategoryService.updated(id, this.req.body);
      return this.res.status(200).json(result);
    } catch (err) {
      return this.res.status(400).json(err);
    }
  }

  public async delete(): Promise<Response> {
    const { id } = this.req.params as unknown as { id: number };
    const result = await CategoryService.deleted(id);

    return this.res.status(200).json(result);
  }
}
