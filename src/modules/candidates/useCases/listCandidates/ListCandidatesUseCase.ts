import { inject, injectable } from "tsyringe";

import { ICandidatesRepository } from "../../repositories/ICandidatesRepository";

interface IRequest {
  page: any;
  per_page: any;
}

type Candidate = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  skills: string[];
  created_at: Date;
  updated_at: Date;
};

interface IResponse {
  candidates: Candidate[];
  total: number;
}

@injectable()
class ListCandidatesUseCase {
  constructor(
    @inject("CandidatesRepository")
    private candidatesRepository: ICandidatesRepository
  ) {}

  async execute({ page = 1, per_page = 10 }: IRequest): Promise<IResponse> {
    let candidates = await this.candidatesRepository.list();

    const total = candidates.length;

    const pageStart = (Number(page) - 1) * Number(per_page);
    const pageEnd = pageStart + Number(per_page);

    candidates = candidates.slice(pageStart, pageEnd);

    const candidatesFormatted: Candidate[] = candidates.map((candidate) => {
      const candidateFormatted = {
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        cpf: candidate.cpf,
        skills: candidate.skills,
        created_at: candidate.created_at,
        updated_at: candidate.updated_at,
      };
      return candidateFormatted;
    });

    const listCandidatesUseCaseResponse: IResponse = {
      candidates: candidatesFormatted,
      total,
    };

    return listCandidatesUseCaseResponse;
  }
}

export { ListCandidatesUseCase };
