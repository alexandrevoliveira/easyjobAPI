import { ICandidatesRepository } from "@modules/candidates/repositories/ICandidatesRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  id: string;
}

type Candidate = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  created_at: Date;
  updated_at: Date;
};

@injectable()
class ShowCandidateUseCase {
  constructor(
    @inject("CandidatesRepository")
    private candidatesRepository: ICandidatesRepository
  ) {}
  async execute({ id }: IRequest): Promise<Candidate> {
    const candidate = await this.candidatesRepository.findById(id);

    if (!candidate) {
      throw new AppError("Candidate does not exists!");
    }

    const candidateRefactored: Candidate = {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      cpf: candidate.cpf,
      created_at: candidate.created_at,
      updated_at: candidate.updated_at,
    };

    return candidateRefactored;
  }
}

export { ShowCandidateUseCase };
