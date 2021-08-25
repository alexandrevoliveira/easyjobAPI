import { ICreateApplicationDTO } from "../dtos/ICreateApplicationDTO";
import { Application } from "../infra/typeorm/entities/Application";

interface IApplicationsRepository {
  create(data: ICreateApplicationDTO): Promise<Application>;
  findByCandidateIdAndVacancyId(
    candidate_id: string,
    vacancy_id: string
  ): Promise<Application>;
}

export { IApplicationsRepository };
