import { CreateUser } from '@/domain/usecases/user'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { CreateUserViewModel } from '@/presentation/view-models/user'

export class CreateUserController implements Controller {
  constructor(
    private readonly createUser: CreateUser
  ) { }

  async handle(request: CreateUser.Params): Promise<HttpResponse<CreateUserViewModel>> {
    try {
      const user = await this.createUser.create(request)
      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
