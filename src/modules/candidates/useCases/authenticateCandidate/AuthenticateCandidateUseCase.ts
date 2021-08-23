import { ICandidatesRepository } from "@modules/candidates/repositories/ICandidatesRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  candidate: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateCandidateUseCase {
  constructor(
    @inject("CandidatesRepository")
    private candidatesRepository: ICandidatesRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const candidate = await this.candidatesRepository.findByEmail(email);

    if (!candidate) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, candidate.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, "3cd836fad390d21d52f789887a653cdb", {
      subject: candidate.id,
      expiresIn: "1d",
    });

    const authCandidateResponse: IResponse = {
      candidate: {
        name: candidate.name,
        email: candidate.email,
      },
      token,
    };

    return authCandidateResponse;
  }
}

export { AuthenticateCandidateUseCase };
