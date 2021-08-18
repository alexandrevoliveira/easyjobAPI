import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCompaniesUseCase } from "./ListCompaniesUseCase";

class ListCompaniesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, per_page } = request.query;

    const listCompaniesUseCase = container.resolve(ListCompaniesUseCase);

    const allCompanies = await listCompaniesUseCase.execute({ page, per_page });

    return response
      .status(200)
      .header({ "x-total-count": String(allCompanies.total) })
      .json(allCompanies);
  }
}

export { ListCompaniesController };
