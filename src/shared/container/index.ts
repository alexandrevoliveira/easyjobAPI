import { CompaniesRepository } from "@modules/companies/infra/typeorm/repositories/CompaniesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { container } from "tsyringe";

container.registerSingleton<ICompaniesRepository>(
  "CompaniesRepository",
  CompaniesRepository
);
