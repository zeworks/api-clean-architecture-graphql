import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import { CreateSessionRepository, LoadSessionByTokenRepository, LoadUserByEmailRepository, UpdateSessionTokenRepository } from '@/data/protocols/db'
import { CreateSession } from '@/domain/usecases/session'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { CreateSessionViewModel } from '@/presentation/view-models/session'

export class CreateSessionController implements Controller {
  constructor(
    private readonly createSessionRepository: CreateSessionRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateSessionTokenRepository: UpdateSessionTokenRepository, // TODO: 
  ) { }

  async handle(request: CreateSession.Params): Promise<HttpResponse<CreateSessionViewModel>> {
    try {
      const user = await this.loadUserByEmailRepository.loadUserByEmail(request.email);
      // encrypting the new access token
      const token = await this.encrypter.encrypt(user.uuid);
      // update the user access token into the DB
      const session = await this.updateSessionTokenRepository.updateSessionToken({ token, id: user.uuid })
      return ok(session);
    } catch (error) {
      return serverError(error)
    }
  }
}
