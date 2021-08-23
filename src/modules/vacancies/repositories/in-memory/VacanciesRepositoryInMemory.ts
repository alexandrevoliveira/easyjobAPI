import { ICreateVacancyDTO } from "@modules/vacancies/dtos/ICreateVacancyDTO";
import { Vacancy } from "@modules/vacancies/infra/typeorm/entities/Vacancy";

import { IVacanciesRepository } from "../IVacanciesRepository";

class VacanciesRepositoryInMemory implements IVacanciesRepository {
  list(): Promise<Vacancy[]> {
    throw new Error("Method not implemented.");
  }

  vacancies: Vacancy[] = [];

  async create({
    role,
    type,
    area,
    requirements,
    salary,
    quantity,
    company_id,
  }: ICreateVacancyDTO): Promise<Vacancy> {
    const vacancy = new Vacancy();

    Object.assign(vacancy, {
      role,
      type,
      area,
      requirements,
      salary,
      quantity,
      company_id,
    });

    this.vacancies.push(vacancy);

    return vacancy;
  }

  async findByRole(role: string): Promise<Vacancy> {
    return this.vacancies.find((vacancy) => vacancy.role === role);
  }

  async findById(id: string): Promise<Vacancy> {
    return this.vacancies.find((vacancy) => vacancy.id === id);
  }
}

export { VacanciesRepositoryInMemory };
