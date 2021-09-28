import { GetUsersRepository } from "@/data/protocols/db";

export class GetUsersService implements GetUsersRepository {
  constructor(
    private readonly getUsersRepository: GetUsersRepository
  ) { }

  async getUsers(): Promise<GetUsersRepository.Result> {
    return this.getUsersRepository.getUsers();
  }
}
