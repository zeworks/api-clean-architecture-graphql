import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import {
  CreateSessionRepository,
  LoadUserByEmailRepository,
  UpdateSessionTokenRepository
} from '@/data/protocols/db'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { CreateSessionViewModel } from '@/presentation/view-models/session'
import { UserInvalidError } from '@/presentation/errors'

export class CreateSessionController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateSessionTokenRepository: UpdateSessionTokenRepository,
  ) { }

  async handle(request: CreateSessionRepository.Params): Promise<HttpResponse<CreateSessionViewModel>> {
    try {
      // validate request
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      // validate if the exists
      const user = await this.loadUserByEmailRepository.load(request.email);
      if (!user || !user.active) return forbidden(new UserInvalidError());

      // compare the password
      const isPasswordValid = await this.hasComparer.compare(request.password, user.password)
      if (!isPasswordValid) return forbidden(new UserInvalidError());

      // encrypting the new access token
      const token = await this.encrypter.encrypt(user.uuid);

      // update the user access token into the DB
      const session = await this.updateSessionTokenRepository.update({ token, id: user.uuid })

      // returns the session
      return ok(session);
    } catch (error) {
      return serverError(error)
    }
  }
}
