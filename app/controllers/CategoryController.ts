import { Request, Response } from "express";
import { CategoryService } from "../services"

export class CategoryController {
  static async create(req: Request, res: Response): Promise<Response> {
    const { name, icon } = req.body;
    const result = await CategoryService.save(name, icon);

    return res.status(200).json(result);
  }

  static async getAll(req: Request, res: Response): Promise<Response> {
    const result = await CategoryService.getAll();
    return res.status(200).json(result);
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };
    const result = await CategoryService.getById(id)

    return res.status(200).json(result)
  }

  static async update(req: Request, res: Response): Promise<Response | object> {
    const { id } = req.params as unknown as { id: number };
    const result = await CategoryService.updated(id, req.body);

    return res.status(200).json(result);
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };
    const result = await CategoryService.deleted(id);

    return res.status(200).json(result);
  }
}
