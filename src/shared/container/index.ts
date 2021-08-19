import { CandidatesRepository } from "@modules/candidates/infra/typeorm/repositories/CandidatesRepository";
import { ICandidatesRepository } from "@modules/candidates/repositories/ICandidatesRepository";
import { CompaniesRepository } from "@modules/companies/infra/typeorm/repositories/CompaniesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { container } from "tsyringe";

container.registerSingleton<ICompaniesRepository>(
  "CompaniesRepository",
  CompaniesRepository
);

container.registerSingleton<ICandidatesRepository>(
  "CandidatesRepository",
  CandidatesRepository
);
