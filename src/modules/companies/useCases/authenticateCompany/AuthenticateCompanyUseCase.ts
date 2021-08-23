import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  company: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateCompanyUseCase {
  constructor(
    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const company = await this.companiesRepository.findByEmail(email);

    if (!company) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, company.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "3cd836fad390d21d52f789887a653cdb", {
      subject: company.id,
      expiresIn: "1d",
    });

    const authCompanyResponse: IResponse = {
      company: {
        name: company.name,
        email: company.email,
      },
      token,
    };

    return authCompanyResponse;
  }
}

export { AuthenticateCompanyUseCase };
