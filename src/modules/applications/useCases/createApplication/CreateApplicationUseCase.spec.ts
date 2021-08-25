import { ApplicationsRepositoryInMemory } from "@modules/applications/repositories/in-memory/ApplicationsRepositoryInMemory";
import { CandidatesRepositoryInMemory } from "@modules/candidates/repositories/in-memory/CandidatesRepositoryInMemory";
import { CreateCandidateUseCase } from "@modules/candidates/useCases/createCandidate/CreateCandidateUseCase";
import { VacanciesRepositoryInMemory } from "@modules/vacancies/repositories/in-memory/VacanciesRepositoryInMemory";
import { CreateVacancyUseCase } from "@modules/vacancies/useCases/createVacancy/CreateVacancyUseCase";

import { AppError } from "@shared/errors/AppError";

import { CreateApplicationUseCase } from "./CreateApplicationUseCase";

let createCandidateUseCase: CreateCandidateUseCase;
let candidatesRepositoryInMemory: CandidatesRepositoryInMemory;

let createVacancyUseCase: CreateVacancyUseCase;
let vacanciesRepositoryInMemory: VacanciesRepositoryInMemory;

let createApplicationUseCase: CreateApplicationUseCase;
let applicationsRepositoryInMemory: ApplicationsRepositoryInMemory;

describe("Create Application", () => {
  beforeEach(() => {
    candidatesRepositoryInMemory = new CandidatesRepositoryInMemory();
    createCandidateUseCase = new CreateCandidateUseCase(
      candidatesRepositoryInMemory
    );
    vacanciesRepositoryInMemory = new VacanciesRepositoryInMemory();
    createVacancyUseCase = new CreateVacancyUseCase(
      vacanciesRepositoryInMemory
    );
    applicationsRepositoryInMemory = new ApplicationsRepositoryInMemory();
    createApplicationUseCase = new CreateApplicationUseCase(
      applicationsRepositoryInMemory
    );
  });

  it("should be able to create a new application", async () => {
    const candidate = await createCandidateUseCase.execute({
      name: "Candidate Test",
      email: "candidate@test.com",
      password: "1234",
      cpf: "11122233301",
    });

    const vacancy = await createVacancyUseCase.execute({
      role: "Role",
      type: "Type",
      area: "IT",
      requirements: ["requirement"],
      salary: 16000,
      quantity: 5,
      company_id: "company",
    });

    const application = await createApplicationUseCase.execute({
      candidate_id: candidate.id,
      vacancy_id: vacancy.id,
    });

    expect(application).toHaveProperty("id");
  });

  it("should not be able to create an application with an existing application already registered", async () => {
    const candidate = await createCandidateUseCase.execute({
      name: "Candidate Test",
      email: "candidate@test.com",
      password: "1234",
      cpf: "11122233301",
    });

    const vacancy = await createVacancyUseCase.execute({
      role: "Role",
      type: "Type",
      area: "IT",
      requirements: ["requirement"],
      salary: 16000,
      quantity: 5,
      company_id: "company",
    });

    const application = await createApplicationUseCase.execute({
      candidate_id: candidate.id,
      vacancy_id: vacancy.id,
    });

    expect(async () => {
      await createApplicationUseCase.execute({
        candidate_id: candidate.id,
        vacancy_id: vacancy.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
