import { IVacanciesRepository } from "@modules/vacancies/repositories/IVacanciesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

type Vacancy = {
  id: string;
  role: string;
  type: string;
  area: string;
  requirements: string[];
  salary: number;
  quantity: number;
  company_id: string;
  created_at: Date;
  updated_at: Date;
};

@injectable()
class ShowVacancyUseCase {
  constructor(
    @inject("VacanciesRepository")
    private vacanciesRepository: IVacanciesRepository
  ) {}
  async execute({ id }: IRequest): Promise<Vacancy> {
    const vacancy = await this.vacanciesRepository.findById(id);

    if (!vacancy) {
      throw new AppError("Vacancy does not exists!");
    }

    const vacancyRefactored: Vacancy = {
      id: vacancy.id,
      role: vacancy.role,
      type: vacancy.type,
      area: vacancy.area,
      requirements: vacancy.requirements,
      salary: vacancy.salary,
      quantity: vacancy.quantity,
      company_id: vacancy.company_id,
      created_at: vacancy.created_at,
      updated_at: vacancy.updated_at,
    };

    return vacancyRefactored;
  }
}

export { ShowVacancyUseCase };
