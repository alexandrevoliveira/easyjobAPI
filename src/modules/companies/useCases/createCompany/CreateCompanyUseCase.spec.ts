import { CompaniesRepositoryInMemory } from "@modules/companies/repositories/in-memory/CompaniesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

let createCompanyUseCase: CreateCompanyUseCase;
let companiesRepositoryInMemory: CompaniesRepositoryInMemory;

describe("Create Company", () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory
    );
  });

  it("should be able to create a new company", async () => {
    const company = await createCompanyUseCase.execute({
      name: "Company Test",
      email: "company@test.com",
      password: "1234",
      cnpj: "11122233300999",
    });

    expect(company).toHaveProperty("id");
  });

  it("should not be able to create a company with existing cnpj", async () => {
    await createCompanyUseCase.execute({
      name: "Company Test",
      email: "company@test.com",
      password: "1234",
      cnpj: "11122233300999",
    });

    expect(async () => {
      await createCompanyUseCase.execute({
        name: "Company Test 2",
        email: "company2@test.com",
        password: "1234",
        cnpj: "11122233300999",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a company with existing email", async () => {
    await createCompanyUseCase.execute({
      name: "Company Test",
      email: "company@test.com",
      password: "1234",
      cnpj: "11122233300999",
    });

    expect(async () => {
      await createCompanyUseCase.execute({
        name: "Company Test 2",
        email: "company@test.com",
        password: "1234",
        cnpj: "11122233300999",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
