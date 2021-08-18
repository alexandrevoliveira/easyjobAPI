import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "../../repositories/ICompaniesRepository";

type Company = {
  id: string;
  name: string;
  email: string;
  cnpj: string;
  created_at: Date;
  updated_at: Date;
};

interface IResponse {
  companies: Company[];
}

@injectable()
class ListCompaniesUseCase {
  constructor(
    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute(): Promise<IResponse> {
    const companies = await this.companiesRepository.list();

    const allCompaniesFormatted: IResponse = {
      companies: companies.map((company) => {
        const companyFormatted = {
          id: company.id,
          name: company.name,
          email: company.email,
          cnpj: company.cnpj,
          created_at: company.created_at,
          updated_at: company.updated_at,
        };
        return companyFormatted;
      }),
    };

    return allCompaniesFormatted;
  }
}

export { ListCompaniesUseCase };
