import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import { CreateSessionRepository, LoadSessionByTokenRepository } from '@/data/protocols/db'
import { CreateSession } from '@/domain/usecases/session'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { ok, serverError } from '@/presentation/helpers'
import { CreateSessionViewModel } from '@/presentation/view-models/session'

export class CreateSessionController implements Controller {
  constructor(
    private readonly createSessionRepository: CreateSessionRepository,
    private readonly loadAccountByEmailRepository: LoadSessionByTokenRepository,
    private readonly hasComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateSessionTokenRepository,
  ) { }

  async handle(request: CreateSession.Params): Promise<HttpResponse<CreateSessionViewModel>> {
    try {
      const user = await this.loadAccountByEmailRepository.loadSessionByToken(request.email);

      if (!user) {
        throw new Error('user not found')
      }

      const accessToken = await this.updateAccessTokenRepository.
      return ok(session)
    } catch (error) {
      return serverError(error)
    }
  }
}
