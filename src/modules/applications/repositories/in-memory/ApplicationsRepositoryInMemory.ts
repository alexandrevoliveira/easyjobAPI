import { ICreateApplicationDTO } from "@modules/applications/dtos/ICreateApplicationDTO";
import { Application } from "@modules/applications/infra/typeorm/entities/Application";

import { IApplicationsRepository } from "../IApplicationsRepository";

class ApplicationsRepositoryInMemory implements IApplicationsRepository {
  applications: Application[] = [];

  async create({
    candidate_id,
    vacancy_id,
  }: ICreateApplicationDTO): Promise<Application> {
    const application = new Application();

    Object.assign(application, { candidate_id, vacancy_id });

    this.applications.push(application);

    return application;
  }

  async findByCandidateIdAndVacancyId(
    candidate_id: string,
    vacancy_id: string
  ): Promise<Application> {
    return this.applications.find((application) => {
      return (
        application.candidate_id === candidate_id &&
        application.vacancy_id === vacancy_id
      );
    });
  }

  async list(): Promise<Application[]> {
    return this.applications;
  }
}

export { ApplicationsRepositoryInMemory };
