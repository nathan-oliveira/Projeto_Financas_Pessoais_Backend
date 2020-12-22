import { EntityRepository, Repository } from "typeorm";
import { GoalDAO } from "../models";
import AppError from "../config/AppError";

@EntityRepository(GoalDAO)
class GoalRepository extends Repository<GoalDAO> {
  public saveGoal(goal: object): Promise<object> {
    try {
      return this.manager.save(GoalDAO, goal);
    } catch (err) {
      throw new AppError("Não foi possível realizar o cadastro.", 400);
    }
  }

  public getAll(userId: number): Promise<GoalDAO[]> {
    return this.manager.find(GoalDAO, { where: { userId } });
  }

  public getById(userId: number, id: number): Promise<GoalDAO[]> {
    return this.manager.find(GoalDAO, { where: { id, userId } });
  }

  public async updated(userId: number, id: number, data: object): Promise<object> {
    await this.manager.update(GoalDAO, { id, userId }, data);
    return { message: "Meta atualizada com sucesso!" };
  }

  public async deleted(userId: number, id: number): Promise<object> {
    await this.manager.delete(GoalDAO, { userId, id });
    return { message: "Meta excluida com sucesso!" };
  }
}

export default GoalRepository;
