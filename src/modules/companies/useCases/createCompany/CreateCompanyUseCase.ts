import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { Company } from "@modules/companies/infra/typeorm/entities/Company";
import { hash } from "bcrypt";
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
  }: ICreateCompanyDTO): Promise<Company> {
    const companyAlreadyExists =
      await this.companiesRepository.findByEmailOrCnpj(email, cnpj);

    if (companyAlreadyExists) {
      throw new AppError("Company already exists!");
    }

    const passwordHash = await hash(password, 8);

    const company = await this.companiesRepository.create({
      name,
      email,
      password: passwordHash,
      cnpj,
    });

    return company;
  }
}

export { CreateCompanyUseCase };
