import { ICreateCandidateDTO } from "@modules/candidates/dtos/ICreateCandidateDTO";
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
  }: ICreateCandidateDTO): Promise<void> {
    const candidateAlreadyExists =
      await this.candidatesRepository.findByEmailOrCpf(email, cpf);

    if (candidateAlreadyExists) {
      throw new AppError("Candidate already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.candidatesRepository.create({
      name,
      email,
      password: passwordHash,
      cpf,
    });
  }
}

export { CreateCandidateUseCase };
