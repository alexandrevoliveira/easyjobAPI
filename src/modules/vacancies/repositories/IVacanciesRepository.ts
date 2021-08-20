import { ICreateVacancyDTO } from "../dtos/ICreateVacancyDTO";
import { Vacancy } from "../infra/typeorm/entities/Vacancy";

interface IVacanciesRepository {
  create(data: ICreateVacancyDTO): Promise<Vacancy>;
  findByRole(role: string): Promise<Vacancy>;
  list(): Promise<Vacancy[]>;
}

export { IVacanciesRepository };
