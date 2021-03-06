import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { CreateUserViewModel } from '@/presentation/view-models/user'
import { CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/db'
import { Hasher, UUID } from '@/data/protocols/cryptography'
import { EmailInUseError } from '@/presentation/errors'

export class CreateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
    private readonly uuidAdapter: UUID
  ) { }

  async handle(request: CreateUserRepository.Params): Promise<HttpResponse<CreateUserViewModel>> {
    try {
      // validates request
      const error = this.validation.validate(request);

      if (error) {
        return badRequest(error)
      }

      const userAlreadyExists = await this.loadUserByEmailRepository.load(request.email);
      if (userAlreadyExists) return forbidden(new EmailInUseError());

      // generate password
      const password = await this.hasher.hash(request.password)
      // generate uuid
      const uuid = await this.uuidAdapter.generate();

      // create user
      const user = await this.createUserRepository.create({
        ...request,
        password,
        uuid
      })

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
