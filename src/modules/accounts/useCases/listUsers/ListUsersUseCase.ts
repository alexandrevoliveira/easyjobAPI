import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

type IAllUsers = {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
  permissions: string[];
  roles: string[];
  created_at: Date;
  updated_at: Date;
};

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<IAllUsers[]> {
    const users = await this.usersRepository.list();

    const allUsersFormatted: IAllUsers[] = users.map((user) => {
      const userFormatted = {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
        permissions: user.permissions,
        roles: user.roles,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return userFormatted;
    });

    return allUsersFormatted;
  }
}

export { ListUsersUseCase };
