import { ICreateApplicationDTO } from "@modules/applications/dtos/ICreateApplicationDTO";
import { IApplicationsRepository } from "@modules/applications/repositories/IApplicationsRepository";
import { getRepository, Repository } from "typeorm";

import { Application } from "../entities/Application";

class ApplicationsRepository implements IApplicationsRepository {
  private repository: Repository<Application>;

  constructor() {
    this.repository = getRepository(Application);
  }

  async create({
    candidate_id,
    vacancy_id,
  }: ICreateApplicationDTO): Promise<Application> {
    const application = this.repository.create({ candidate_id, vacancy_id });

    await this.repository.save(application);

    return application;
  }

  async findByCandidateIdAndVacancyId(
    candidate_id: string,
    vacancy_id: string
  ): Promise<Application> {
    const application = await this.repository.findOne({
      where: { candidate_id, vacancy_id },
    });

    return application;
  }
}

export { ApplicationsRepository };
