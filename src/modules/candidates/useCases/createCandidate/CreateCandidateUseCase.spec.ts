import { CandidatesRepositoryInMemory } from "@modules/candidates/repositories/in-memory/CandidatesRepositoryInMemory";

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
});
