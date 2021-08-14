import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

type User = {
  id: string;
  name: string;
  email: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

interface IResponse {
  users: User[];
}

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<IResponse> {
    const users = await this.usersRepository.list();

    const allUsersFormatted: IResponse = {
      users: users.map((user) => {
        const userFormatted = {
          id: user.id,
          name: user.name,
          email: user.email,
          type: user.type,
          created_at: user.created_at,
          updated_at: user.updated_at,
        };
        return userFormatted;
      }),
    };

    return allUsersFormatted;
  }
}

export { ListUsersUseCase };
