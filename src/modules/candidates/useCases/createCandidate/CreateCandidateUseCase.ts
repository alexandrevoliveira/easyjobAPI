import { ICreateCandidateDTO } from "@modules/candidates/dtos/ICreateCandidateDTO";
import { Candidate } from "@modules/candidates/infra/typeorm/entities/Candidate";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICandidatesRepository } from "../../repositories/ICandidatesRepository";

@injectable()
class CreateCandidateUseCase {
  constructor(
    @inject("CandidatesRepository")
    private candidatesRepository: ICandidatesRepository
  ) {}

  async execute({
    name,
    email,
    password,
    cpf,
  }: ICreateCandidateDTO): Promise<Candidate> {
    const candidateAlreadyExists =
      await this.candidatesRepository.findByEmailOrCpf(email, cpf);

    if (candidateAlreadyExists) {
      throw new AppError("Candidate already exists!");
    }

    const passwordHash = await hash(password, 8);

    const candidate = await this.candidatesRepository.create({
      name,
      email,
      password: passwordHash,
      cpf,
    });

    return candidate;
  }
}

export { CreateCandidateUseCase };
