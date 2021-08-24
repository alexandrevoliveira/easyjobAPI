import { ICreateCandidateDTO } from "@modules/candidates/dtos/ICreateCandidateDTO";
import { Candidate } from "@modules/candidates/infra/typeorm/entities/Candidate";

import { ICandidatesRepository } from "../ICandidatesRepository";

class CandidatesRepositoryInMemory implements ICandidatesRepository {
  candidates: Candidate[] = [];

  async create({
    name,
    email,
    password,
    cpf,
  }: ICreateCandidateDTO): Promise<Candidate> {
    const candidate = new Candidate();

    Object.assign(candidate, { name, email, password, cpf });

    this.candidates.push(candidate);

    return candidate;
  }

  async findByEmail(email: string): Promise<Candidate> {
    return this.candidates.find((candidate) => candidate.email === email);
  }

  async findById(id: string): Promise<Candidate> {
    return this.candidates.find((candidate) => candidate.id === id);
  }

  async findByEmailOrCpf(email: string, cpf: string): Promise<Candidate> {
    return this.candidates.find((candidate) => {
      return candidate.email === email || candidate.cpf === cpf;
    });
  }

  async list(): Promise<Candidate[]> {
    return this.candidates;
  }
}

export { CandidatesRepositoryInMemory };
