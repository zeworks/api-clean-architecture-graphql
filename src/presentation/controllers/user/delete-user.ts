import { DeleteUserRepository, GetUserByIdRepository } from "@/data/protocols/db";
import { ServerError, UserInvalidError } from "@/presentation/errors";
import { forbidden, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { DeleteUserViewModel } from "@/presentation/view-models/user/delete-user";

export class DeleteUserController implements Controller {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepository,
    private readonly getUserByIdRepository: GetUserByIdRepository
  ) { }

  async handle({ id }: DeleteUserRepository.Params): Promise<HttpResponse<DeleteUserViewModel>> {
    const user = await this.getUserByIdRepository.get(id);

    if (!user || !user.active) return forbidden(new UserInvalidError());

    const result = await this.deleteUserRepository.delete(id);

    if (result)
      return ok(result);

    return serverError(new ServerError());
  }
}
