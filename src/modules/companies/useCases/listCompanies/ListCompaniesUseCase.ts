import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "../../repositories/ICompaniesRepository";

interface IRequest {
  page: any;
  per_page: any;
}

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
  total: number;
}

@injectable()
class ListCompaniesUseCase {
  constructor(
    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository
  ) {}

  async execute({ page = 1, per_page = 10 }: IRequest): Promise<IResponse> {
    let companies = await this.companiesRepository.list();

    const total = companies.length;

    const pageStart = (Number(page) - 1) * Number(per_page);
    const pageEnd = pageStart + Number(per_page);

    companies = companies.slice(pageStart, pageEnd);

    const companiesFormatted: Company[] = companies.map((company) => {
      const companyFormatted = {
        id: company.id,
        name: company.name,
        email: company.email,
        cnpj: company.cnpj,
        created_at: company.created_at,
        updated_at: company.updated_at,
      };
      return companyFormatted;
    });

    const listCompaniseUseCaseResponse: IResponse = {
      companies: companiesFormatted,
      total,
    };

    return listCompaniseUseCaseResponse;
  }
}

export { ListCompaniesUseCase };
