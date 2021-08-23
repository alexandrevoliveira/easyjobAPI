import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowVacancyUseCase } from "./ShowVacancyUseCase";

class ShowVacancyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showVacancyUseCase = container.resolve(ShowVacancyUseCase);

    const vacancy = await showVacancyUseCase.execute({ id });

    return response.status(200).json(vacancy);
  }
}

export { ShowVacancyController };
