import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Company } from "../infra/typeorm/entities/Company";

interface ICompaniesRepository {
  create({ name, email, password, cnpj }: ICreateCompanyDTO): Promise<Company>;
  findByEmail(email: string): Promise<Company>;
  findByEmailOrCnpj(email: string, cnpj: string): Promise<Company>;
  list(): Promise<Company[]>;
  findById(id: string): Promise<Company>;
}

export { ICompaniesRepository };
