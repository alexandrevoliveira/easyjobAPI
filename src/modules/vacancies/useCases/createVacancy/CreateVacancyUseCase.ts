import { Vacancy } from "@modules/vacancies/infra/typeorm/entities/Vacancy";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IVacanciesRepository } from "../../repositories/IVacanciesRepository";

interface IRequest {
  role: string;
  type: string;
  area: string;
  requirements: string[];
  salary: number;
  quantity: number;
  company_id: string;
}

@injectable()
class CreateVacancyUseCase {
  constructor(
    @inject("VacanciesRepository")
    private vacanciesRepository: IVacanciesRepository
  ) {}

  async execute({
    role,
    type,
    area,
    requirements,
    salary,
    quantity,
    company_id,
  }: IRequest): Promise<Vacancy> {
    const vacancyAlreadyExists = await this.vacanciesRepository.findByRole(
      role
    );

    if (vacancyAlreadyExists) {
      throw new AppError("Vacancy already exists!");
    }

    const vacancy = await this.vacanciesRepository.create({
      role,
      type,
      area,
      requirements,
      salary,
      quantity,
      company_id,
    });

    return vacancy;
  }
}

export { CreateVacancyUseCase };
