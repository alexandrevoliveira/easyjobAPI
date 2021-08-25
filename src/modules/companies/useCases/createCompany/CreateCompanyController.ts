import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cnpj } = request.body;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const company = await createCompanyUseCase.execute({
      name,
      email,
      password,
      cnpj,
    });

    return response.status(201).json(company);
  }
}

export { CreateCompanyController };
