import { Hasher } from "@/data/protocols/cryptography";
import { LoadUserByIdRepository, UpdateUserRepository } from "@/data/protocols/db";
import { UserInvalidError } from "@/presentation/errors";
import { BadRequestError } from "@/presentation/errors/bad-request";
import { ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { validateRequiredFields } from "@/presentation/validators/required-fields-validator";

export class UpdateUserController implements Controller {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly loadUserByIdRepository: LoadUserByIdRepository,
    private readonly hashAdapter: Hasher
  ) { }

  async handle(request: UpdateUserRepository.Params): Promise<HttpResponse<UpdateUserRepository.Result>> {
    const isRequiredFieldsValid = validateRequiredFields(request, ["id"])
    if (!isRequiredFieldsValid) throw new BadRequestError();

    const userFound: any = await this.loadUserByIdRepository.loadUserById(request.id);
    if (!userFound || !userFound.active) throw new UserInvalidError();

    let password: string = request.input.password;

    if (request.input.password) {
      password = await this.hashAdapter.hash(request.input.password)
    }

    Object.assign(userFound, {
      ...request.input,
      password,
    })

    try {
      const user = await this.updateUserRepository.update({ input: userFound, id: request.id })
      return ok(user);
    } catch (error) {
      console.log(error);

      return serverError(error)
    }
  }
}
