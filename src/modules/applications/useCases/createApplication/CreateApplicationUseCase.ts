import { Application } from "@modules/applications/infra/typeorm/entities/Application";
import { IApplicationsRepository } from "@modules/applications/repositories/IApplicationsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  candidate_id: string;
  vacancy_id: string;
}

@injectable()
class CreateApplicationUseCase {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository
  ) {}

  async execute({ candidate_id, vacancy_id }: IRequest): Promise<Application> {
    const applicationAlreadyExists =
      await this.applicationsRepository.findByCandidateIdAndVacancyId(
        candidate_id,
        vacancy_id
      );

    if (applicationAlreadyExists) {
      throw new AppError("Application already exists");
    }

    const application = await this.applicationsRepository.create({
      candidate_id,
      vacancy_id,
    });

    return application;
  }
}

export { CreateApplicationUseCase };
