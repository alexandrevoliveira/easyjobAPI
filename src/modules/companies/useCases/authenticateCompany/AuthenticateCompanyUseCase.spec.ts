import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { CompaniesRepositoryInMemory } from "@modules/companies/repositories/in-memory/CompaniesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCompanyUseCase } from "../createCompany/CreateCompanyUseCase";
import { AuthenticateCompanyUseCase } from "./AuthenticateCompanyUseCase";

let authenticateCompanyUseCase: AuthenticateCompanyUseCase;
let companiesRepositoryInMemory: CompaniesRepositoryInMemory;
let createCompanyUseCase: CreateCompanyUseCase;

describe("Authenticate Company", () => {
  beforeEach(() => {
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory();
    authenticateCompanyUseCase = new AuthenticateCompanyUseCase(
      companiesRepositoryInMemory
    );
    createCompanyUseCase = new CreateCompanyUseCase(
      companiesRepositoryInMemory
    );
  });
  it("should be able to authenticate an company", async () => {
    const company: ICreateCompanyDTO = {
      name: "Company Test",
      email: "company@test.com",
      password: "1234",
      cnpj: "11122233334444",
    };

    await createCompanyUseCase.execute(company);

    const result = await authenticateCompanyUseCase.execute({
      email: company.email,
      password: company.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non existing company", () => {
    expect(async () => {
      await authenticateCompanyUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with an incorrect password", () => {
    expect(async () => {
      const company: ICreateCompanyDTO = {
        name: "Company Test Error",
        email: "company@company.com",
        password: "1234",
        cnpj: "11122233334444",
      };

      await createCompanyUseCase.execute(company);

      await authenticateCompanyUseCase.execute({
        email: company.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
