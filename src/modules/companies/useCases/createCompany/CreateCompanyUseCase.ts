import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICompaniesRepository } from "../../repositories/ICompaniesRepository";

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({
    name,
    email,
    password,
    cnpj,
  }: ICreateCompanyDTO): Promise<void> {
    const companyAlreadyExists = await this.companiesRepository.findByEmail(
      email
    );

    if (companyAlreadyExists) {
      throw new AppError("Company already exists!");
    }

    await this.companiesRepository.create({ name, email, password, cnpj });
  }
}

export { CreateCompanyUseCase };
