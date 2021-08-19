import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCandidateUseCase } from "./CreateCandidateUseCase";

class CreateCandidateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf } = request.body;

    const createCandidateUseCase = container.resolve(CreateCandidateUseCase);

    await createCandidateUseCase.execute({ name, email, password, cpf });

    return response.status(201).send();
  }
}

export { CreateCandidateController };
