import { ICreateCandidateDTO } from "../dtos/ICreateCandidateDTO";
import { Candidate } from "../infra/typeorm/entities/Candidate";

interface ICandidatesRepository {
  create({ name, email, password, cpf }: ICreateCandidateDTO): Promise<void>;
  findByEmail(email: string): Promise<Candidate>;
  findByEmailOrCpf(email: string, cpf: string): Promise<Candidate>;
  list(): Promise<Candidate[]>;
  findById(id: string): Promise<Candidate>;
}

export { ICandidatesRepository };
