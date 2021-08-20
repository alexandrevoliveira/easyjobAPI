import { ICreateVacancyDTO } from "@modules/vacancies/dtos/ICreateVacancyDTO";
import { IVacanciesRepository } from "@modules/vacancies/repositories/IVacanciesRepository";
import { getRepository, Repository } from "typeorm";

import { Vacancy } from "../entities/Vacancy";

class VacanciesRepository implements IVacanciesRepository {
  private repository: Repository<Vacancy>;

  constructor() {
    this.repository = getRepository(Vacancy);
  }

  async create({
    role,
    type,
    area,
    requirements,
    salary,
    quantity,
    company_id,
  }: ICreateVacancyDTO): Promise<Vacancy> {
    const vacancy = this.repository.create({
      role,
      type,
      area,
      requirements,
      salary,
      quantity,
      company_id,
    });

    await this.repository.save(vacancy);

    return vacancy;
  }

  async findByRole(role: string): Promise<Vacancy> {
    const vacancy = await this.repository.findOne({ role });
    return vacancy;
  }

  async list(): Promise<Vacancy[]> {
    return this.repository.find();
  }
}

export { VacanciesRepository };
