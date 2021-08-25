import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateApplicationUseCase } from "./CreateApplicationUseCase";

class CreateApplicationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { candidate_id, vacancy_id } = request.body;

    const createApplicationUseCase = container.resolve(
      CreateApplicationUseCase
    );

    const application = await createApplicationUseCase.execute({
      candidate_id,
      vacancy_id,
    });

    return response.status(201).json(application);
  }
}

export { CreateApplicationController };
