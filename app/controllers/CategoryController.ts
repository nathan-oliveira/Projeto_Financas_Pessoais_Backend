import { Request, Response } from "express";
import { CategoryService } from "../services"

export class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, icon } = req.body;

    try {
      const result = await CategoryService.save(name, icon);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const result = await CategoryService.getAll();
    return res.status(200).json(result);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };
    const result = await CategoryService.getById(id)

    return res.status(200).json(result)
  }

  public async update(req: Request, res: Response): Promise<Response | object> {
    const { id } = req.params as unknown as { id: number };

    try {
      const result = await CategoryService.updated(id, req.body);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };
    const result = await CategoryService.deleted(id);

    return res.status(200).json(result);
  }
}
