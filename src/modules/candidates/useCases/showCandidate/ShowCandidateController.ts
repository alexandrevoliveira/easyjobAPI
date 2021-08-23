import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowCandidateUseCase } from "./ShowCandidateUseCase";

class ShowCandidateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCandidateUseCase = container.resolve(ShowCandidateUseCase);

    const company = await showCandidateUseCase.execute({ id });

    return response.status(200).json(company);
  }
}

export { ShowCandidateController };
