import { VacanciesRepositoryInMemory } from "@modules/vacancies/repositories/in-memory/VacanciesRepositoryInMemory";

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
});
