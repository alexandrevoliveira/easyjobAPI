import { Application } from "@modules/applications/infra/typeorm/entities/Application";
import { IApplicationsRepository } from "@modules/applications/repositories/IApplicationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListApplicationsUseCase {
  constructor(
    @inject("ApplicationsRepository")
    private applicationsRepository: IApplicationsRepository
  ) {}

  async execute(): Promise<Application[]> {
    const applications = await this.applicationsRepository.list();
    return applications;
  }
}

export { ListApplicationsUseCase };
