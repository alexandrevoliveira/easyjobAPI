import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateVacancyUseCase } from "./CreateVacancyUseCase";

class CreateVacancyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { role, type, area, requirements, quantity, salary, company_id } =
      request.body;

    const createVacancyUseCase = container.resolve(CreateVacancyUseCase);

    const vacancy = await createVacancyUseCase.execute({
      role,
      type,
      area,
      requirements,
      quantity,
      salary,
      company_id,
    });

    return response.status(201).json(vacancy);
  }
}

export { CreateVacancyController };
