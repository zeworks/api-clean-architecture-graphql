import { DeleteUserRepository } from "@/data/protocols/db";
import { DeleteUserUseCase } from "@/domain/usecases";

export class DeleteUserService implements DeleteUserUseCase {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepository
  ) { }

  async delete(id: string): DeleteUserUseCase.Result {
    return await this.deleteUserRepository.delete(id)
  }
}
