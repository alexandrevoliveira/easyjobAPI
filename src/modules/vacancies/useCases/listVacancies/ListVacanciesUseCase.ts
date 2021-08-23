import { inject, injectable } from "tsyringe";

import { IVacanciesRepository } from "../../repositories/IVacanciesRepository";

interface IRequest {
  page: any;
  per_page: any;
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

interface IResponse {
  vacancies: Vacancy[];
  total: number;
}

@injectable()
class ListVacanciesUseCase {
  constructor(
    @inject("VacanciesRepository")
    private vacanciesRepository: IVacanciesRepository
  ) {}

  async execute({ page = 1, per_page = 10 }: IRequest): Promise<IResponse> {
    let vacancies = await this.vacanciesRepository.list();

    const total = vacancies.length;

    const pageStart = (Number(page) - 1) * Number(per_page);
    const pageEnd = pageStart + Number(per_page);

    vacancies = vacancies.slice(pageStart, pageEnd);

    const vacanciesFormatted: Vacancy[] = vacancies.map((vacancy) => {
      const vacancyFormatted = {
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
      return vacancyFormatted;
    });

    const listVacanciesUseCaseResponse: IResponse = {
      vacancies: vacanciesFormatted,
      total,
    };

    return listVacanciesUseCaseResponse;
  }
}

export { ListVacanciesUseCase };
