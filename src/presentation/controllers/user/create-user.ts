import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { CreateUserViewModel } from '@/presentation/view-models/user'
import { CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/cryptography'
import { EmailInUseError } from '@/presentation/errors'

export class CreateUserController implements Controller {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher
  ) { }

  async handle(request: CreateUserRepository.Params): Promise<HttpResponse<CreateUserViewModel>> {
    const userAlreadyExists = await this.loadUserByEmailRepository.loadUserByEmail(request.email);
    if (userAlreadyExists) throw new EmailInUseError();
    // generate password
    const password = await this.hasher.hash(request.password)

    try {
      // create user
      const user = await this.createUserRepository.create({
        ...request,
        password
      })
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
