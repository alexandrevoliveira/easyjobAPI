import { CandidatesRepositoryInMemory } from "@modules/candidates/repositories/in-memory/CandidatesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCandidateUseCase } from "./CreateCandidateUseCase";

let createCandidateUseCase: CreateCandidateUseCase;
let candidatesRepositoryInMemory: CandidatesRepositoryInMemory;

describe("Create Candidate", () => {
  beforeEach(() => {
    candidatesRepositoryInMemory = new CandidatesRepositoryInMemory();
    createCandidateUseCase = new CreateCandidateUseCase(
      candidatesRepositoryInMemory
    );
  });

  it("should be able to create a new candidate", async () => {
    const candidate = await createCandidateUseCase.execute({
      name: "Candidate Test",
      email: "candidatee@test.com",
      password: "1234",
      cpf: "11122233301",
    });

    expect(candidate).toHaveProperty("id");
  });

  it("should not be able to create a candidate with existing cpf", async () => {
    await createCandidateUseCase.execute({
      name: "Candidate Test",
      email: "candidatee@test.com",
      password: "1234",
      cpf: "11122233301",
    });

    expect(async () => {
      await createCandidateUseCase.execute({
        name: "Candidate Test 2",
        email: "candidateee@test.com",
        password: "1234",
        cpf: "11122233301",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a candidate with existing email", async () => {
    await createCandidateUseCase.execute({
      name: "Candidate Test",
      email: "candidate@test.com",
      password: "1234",
      cpf: "00077733399",
    });

    expect(async () => {
      await createCandidateUseCase.execute({
        name: "Candidate Test 2",
        email: "candidate@test.com",
        password: "1234",
        cpf: "00077733311",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
