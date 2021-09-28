import { GetUserByIdRepository } from "@/data/protocols/db";
import { UserInvalidError, FieldMissingError } from "@/presentation/errors";
import { forbidden, ok } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class GetUserController implements Controller {
  constructor(
    private readonly getUserByRepository: GetUserByIdRepository
  ) { }

  async handle({ id }: GetUserByIdRepository.Params): Promise<HttpResponse<GetUserByIdRepository.Result>> {
    if (!id) return forbidden(new FieldMissingError("id"));

    const user = await this.getUserByRepository.get(id)

    if (!user) return forbidden(new UserInvalidError())

    return ok(user)
  }
}
