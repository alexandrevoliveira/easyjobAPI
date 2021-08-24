import { ICreateCandidateDTO } from "@modules/candidates/dtos/ICreateCandidateDTO";
import { CandidatesRepositoryInMemory } from "@modules/candidates/repositories/in-memory/CandidatesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCandidateUseCase } from "../createCandidate/CreateCandidateUseCase";
import { AuthenticateCandidateUseCase } from "./AuthenticateCandidateUseCase";

let authenticateCandidateUseCase: AuthenticateCandidateUseCase;
let candidatesRepositoryInMemory: CandidatesRepositoryInMemory;
let createCandidateUseCase: CreateCandidateUseCase;

describe("Authenticate Candidate", () => {
  beforeEach(() => {
    candidatesRepositoryInMemory = new CandidatesRepositoryInMemory();
    authenticateCandidateUseCase = new AuthenticateCandidateUseCase(
      candidatesRepositoryInMemory
    );
    createCandidateUseCase = new CreateCandidateUseCase(
      candidatesRepositoryInMemory
    );
  });
  it("should be able to authenticate a candidate", async () => {
    const candidate: ICreateCandidateDTO = {
      name: "Candidate Test",
      email: "candidate@test.com",
      password: "1234",
      cpf: "11122233300",
    };

    await createCandidateUseCase.execute(candidate);

    const result = await authenticateCandidateUseCase.execute({
      email: candidate.email,
      password: candidate.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non existing candidate", () => {
    expect(async () => {
      await authenticateCandidateUseCase.execute({
        email: "false@email.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with an incorrect password", () => {
    expect(async () => {
      const candidate: ICreateCandidateDTO = {
        name: "Candidate Test Error",
        email: "candidate@candidate.com",
        password: "1234",
        cpf: "11122233300",
      };

      await createCandidateUseCase.execute(candidate);

      await authenticateCandidateUseCase.execute({
        email: candidate.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
