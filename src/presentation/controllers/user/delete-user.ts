import { DeleteUserRepository, LoadUserByIdRepository } from "@/data/protocols/db";
import { UserInvalidError } from "@/presentation/errors";
import { forbidden, ok } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { DeleteUserViewModel } from "@/presentation/view-models/user/delete-user";

export class DeleteUserController implements Controller {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepository,
    private readonly loadUserById: LoadUserByIdRepository
  ) { }

  async handle({ id }: DeleteUserRepository.Params): Promise<HttpResponse<DeleteUserViewModel>> {
    try {
      const user = await this.loadUserById.loadUserById(id);
      // if the user doesn't exists or if the user is already deleted/not active
      if (!user || !user.active) return forbidden(new UserInvalidError());

      const result = await this.deleteUserRepository.delete(id);
      return ok(result);
    } catch (error) {
      return forbidden(error);
    }
  }
}
