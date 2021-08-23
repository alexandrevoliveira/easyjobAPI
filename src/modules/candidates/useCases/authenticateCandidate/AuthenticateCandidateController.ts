import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateCandidateUseCase } from "./AuthenticateCandidateUseCase";

class AuthenticateCandidateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateCandidateUseCase = container.resolve(
      AuthenticateCandidateUseCase
    );

    const token = await authenticateCandidateUseCase.execute({
      email,
      password,
    });

    return response.status(201).json(token);
  }
}

export { AuthenticateCandidateController };
