import { getCustomRepository } from "typeorm";
import { validate } from "class-validator";

import AppError from "../config/AppError";
import { GoalDAO } from "../models";
import { GoalRepository } from "../repository";

class GoalService {
  static async save(dados: object): Promise<object> {
    const goal = GoalDAO.create(dados);
    const errors = await validate(goal);

    if (errors.length > 0) throw errors.map((v) => v.constraints);
    return await getCustomRepository(GoalRepository).saveGoal(goal);
  }

  static async getAll(userId: number): Promise<GoalDAO[]> {
    return await getCustomRepository(GoalRepository).getAll(userId);
  }

  static async getById(userId: number, id: number): Promise<GoalDAO[]> {
    const goal: GoalDAO[] | undefined = await getCustomRepository(GoalRepository).getById(
      userId,
      id
    );

    if (goal.length === 0) throw new AppError("Meta não foi encontrada.", 400);
    return goal;
  }

  static async updated(userId: number, id: number, data: object | any): Promise<GoalDAO[] | object> {
    if (!data.description || !data.types || !data.money) return new AppError("Favor preencha todos os campos.", 400);
    await this.getById(userId, id);

    return await getCustomRepository(GoalRepository).updated(userId, id, data);
  }

  static async deleted(userId: number, id: number): Promise<GoalDAO[] | object> {
    await this.getById(userId, id);
    return await getCustomRepository(GoalRepository).deleted(userId, id);
  }
}

export default GoalService;
