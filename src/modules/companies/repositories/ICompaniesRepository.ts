import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Company } from "../infra/typeorm/entities/Company";

interface ICompaniesRepository {
  create({ name, email, password, cnpj }: ICreateCompanyDTO): Promise<void>;
  findByEmail(email: string): Promise<Company>;
  findByEmailOrCnpj(email: string, cnpj: string): Promise<Company>;
  list(): Promise<Company[]>;
}

export { ICompaniesRepository };
