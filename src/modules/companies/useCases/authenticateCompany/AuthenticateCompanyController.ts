import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateCompanyUseCase } from "./AuthenticateCompanyUseCase";

class AuthenticateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateCompanyUseCase = container.resolve(
      AuthenticateCompanyUseCase
    );

    const token = await authenticateCompanyUseCase.execute({
      email,
      password,
    });

    return response.status(201).json(token);
  }
}

export { AuthenticateCompanyController };
