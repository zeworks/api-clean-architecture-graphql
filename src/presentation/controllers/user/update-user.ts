import { Hasher } from "@/data/protocols/cryptography";
import { GetUserByIdRepository, UpdateUserRepository } from "@/data/protocols/db";
import { ServerError, UserInvalidError } from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class UpdateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly getUserByIdRepository: GetUserByIdRepository,
    private readonly hashAdapter: Hasher
  ) { }

  async handle(request: UpdateUserRepository.Params): Promise<HttpResponse<UpdateUserRepository.Result>> {
    try {
      const errors = this.validation.validate(request);
      if (errors) return badRequest(errors);

      const userFound: any = await this.getUserByIdRepository.get(request.id);
      if (!userFound) return forbidden(new UserInvalidError());

      let password: string = userFound.password;

      if (request.input.password) {
        password = await this.hashAdapter.hash(request.input.password)
      }

      Object.assign(userFound, {
        ...request.input,
        password,
      })

      const user = await this.updateUserRepository.update({ input: userFound, id: request.id })
      return ok(user);
    } catch (error) {
      return serverError(error)
    }
  }
}
