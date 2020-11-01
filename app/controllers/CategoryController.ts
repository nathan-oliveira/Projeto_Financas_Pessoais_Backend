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

  public async getAll(req: Request, res: Response): Promise<Response> {
    const result = await CategoryService.prototype.getAll();
    return res.status(200).json(result);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };
    const result = await CategoryService.prototype.getById(id)

    if (result.length > 0) return res.status(200).json(result);
    return res.status(404).json({ message: "Categoria não encontrado." });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };
    const category = await CategoryService.prototype.updated(id, req.body);

    if (category.affected > 0) return res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
    return res.status(404).json({ message: "Não foi possível atualizar a categoria." });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as unknown as { id: number };
    const category = await CategoryService.prototype.deleted(id);

    if (category.affected > 0) return res.status(200).json({ message: 'Categoria excluida com sucesso!' });
    return res.status(404).json({ message: 'Não foi possível excluir a cetegoria' });
  }
}
