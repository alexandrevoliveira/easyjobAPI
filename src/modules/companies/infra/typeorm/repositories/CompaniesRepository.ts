import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { getRepository, Repository } from "typeorm";

import { Company } from "../entities/Company";

class CompaniesRepository implements ICompaniesRepository {
  private repository: Repository<Company>;

  constructor() {
    this.repository = getRepository(Company);
  }

  async create({
    name,
    email,
    password,
    cnpj,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.repository.create({ name, email, password, cnpj });

    await this.repository.save(company);

    return company;
  }

  async findByEmail(email: string): Promise<Company> {
    const company = await this.repository.findOne({ email });
    return company;
  }

  async findByEmailOrCnpj(email: string, cnpj: string): Promise<Company> {
    const company = await this.repository.findOne({
      where: [{ email }, { cnpj }],
    });
    return company;
  }

  async list(): Promise<Company[]> {
    const companies = this.repository.find();
    return companies;
  }

  async findById(id: string): Promise<Company> {
    return this.repository.findOne(id);
  }
}

export { CompaniesRepository };
