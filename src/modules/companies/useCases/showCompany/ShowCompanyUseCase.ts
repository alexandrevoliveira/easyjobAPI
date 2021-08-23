import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

type Company = {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  created_at: Date;
  updated_at: Date;
};

@injectable()
class ShowCompanyUseCase {
  constructor(
    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository
  ) {}
  async execute({ id }: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) {
      throw new AppError("Company does not exists!");
    }

    const companyRefactored: Company = {
      id: company.id,
      name: company.name,
      email: company.email,
      cnpj: company.cnpj,
      created_at: company.created_at,
      updated_at: company.updated_at,
    };

    return companyRefactored;
  }
}

export { ShowCompanyUseCase };
