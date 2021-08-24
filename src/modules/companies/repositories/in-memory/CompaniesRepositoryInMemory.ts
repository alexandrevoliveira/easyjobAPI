import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { Company } from "@modules/companies/infra/typeorm/entities/Company";

import { ICompaniesRepository } from "../ICompaniesRepository";

class CompaniesRepositoryInMemory implements ICompaniesRepository {
  companies: Company[] = [];

  async create({
    name,
    email,
    password,
    cnpj,
  }: ICreateCompanyDTO): Promise<void> {
    const company = new Company();

    Object.assign(company, { name, email, password, cnpj });

    this.companies.push(company);
  }

  async findByEmail(email: string): Promise<Company> {
    return this.companies.find((company) => company.email === email);
  }

  async findById(id: string): Promise<Company> {
    return this.companies.find((company) => company.id === id);
  }

  async findByEmailOrCnpj(email: string, cnpj: string): Promise<Company> {
    return this.companies.find((company) => {
      return company.email === email || company.cnpj === cnpj;
    });
  }

  async list(): Promise<Company[]> {
    return this.companies;
  }
}

export { CompaniesRepositoryInMemory };
