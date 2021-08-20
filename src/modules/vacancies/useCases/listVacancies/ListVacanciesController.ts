import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListVacanciesUseCase } from "./ListVacanciesUseCase";

class ListVacanciesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, per_page } = request.query;

    const listVacanciesUseCase = container.resolve(ListVacanciesUseCase);

    const allVacancies = await listVacanciesUseCase.execute({ page, per_page });

    return response
      .status(200)
      .header({ "x-total-count": String(allVacancies.total) })
      .json(allVacancies);
  }
}

export { ListVacanciesController };
