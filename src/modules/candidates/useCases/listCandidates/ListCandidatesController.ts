import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCandidatesUseCase } from "./ListCandidatesUseCase";

class ListCandidatesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page, per_page } = request.query;

    const listCandidatesUseCase = container.resolve(ListCandidatesUseCase);

    const allCandidates = await listCandidatesUseCase.execute({
      page,
      per_page,
    });

    return response
      .status(200)
      .header({ "x-total-count": String(allCandidates.total) })
      .json(allCandidates);
  }
}

export { ListCandidatesController };
