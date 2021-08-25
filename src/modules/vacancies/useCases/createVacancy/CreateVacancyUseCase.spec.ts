import { VacanciesRepositoryInMemory } from "@modules/vacancies/repositories/in-memory/VacanciesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateVacancyUseCase } from "./CreateVacancyUseCase";

let createVacancyUseCase: CreateVacancyUseCase;
let vacanciesRepositoryInMemory: VacanciesRepositoryInMemory;

describe("Create Vacancy", () => {
  beforeEach(() => {
    vacanciesRepositoryInMemory = new VacanciesRepositoryInMemory();
    createVacancyUseCase = new CreateVacancyUseCase(
      vacanciesRepositoryInMemory
    );
  });

  it("should be able to create a new vacancy", async () => {
    const vacancy = await createVacancyUseCase.execute({
      role: "Role",
      type: "Type",
      area: "IT",
      requirements: ["requirement"],
      salary: 16000,
      quantity: 5,
      company_id: "company",
    });

    expect(vacancy).toHaveProperty("id");
  });

  it("should not be able to create a vacancy with existing role", async () => {
    await createVacancyUseCase.execute({
      role: "Role",
      type: "Type",
      area: "IT",
      requirements: ["requirement"],
      salary: 16000,
      quantity: 5,
      company_id: "company",
    });

    expect(async () => {
      await createVacancyUseCase.execute({
        role: "Role",
        type: "Type CLT",
        area: "Design",
        requirements: ["requirement"],
        salary: 8000,
        quantity: 3,
        company_id: "company",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
