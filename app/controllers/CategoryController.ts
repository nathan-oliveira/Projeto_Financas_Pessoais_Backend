import { Request, Response } from "express";
import { CategoryService } from "../services"

export class CategoryController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, icon } = req.body;

    if (!name || !icon) return res.status(422).json({ message: "Favor preencha todos os campos de cadastro." });

    try {
      const result = await CategoryService.prototype.save(name, icon);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ message: "Não foi possível realizar o Cadastro." });
    }
  }

  public async getCategoryId(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };

    try {
      const result = await CategoryService.prototype.getCategory(id)
      return res.status(200).json(result);
    } catch (err) {
      return res.status(404).json({ message: "Categoria não encontrado." });
    }
  }
}
