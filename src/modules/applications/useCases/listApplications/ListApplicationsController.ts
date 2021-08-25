import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListApplicationsUseCase } from "./ListApplicationsUseCase";

class ListApplicationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listApplicationsUseCase = container.resolve(ListApplicationsUseCase);

    const applications = await listApplicationsUseCase.execute();

    return response
      .status(200)
      .header({ "x-total-count": String(applications.length) })
      .json(applications);
  }
}

export { ListApplicationsController };
