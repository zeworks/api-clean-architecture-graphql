import { LoadSessionByToken } from '@/domain/usecases/session'
import { LoadSessionByTokenRepository } from '@/data/protocols/db'

export class LoadSessionTokenService implements LoadSessionByToken {
  constructor(
    private readonly loadBySessionTokenRepository: LoadSessionByTokenRepository
  ) { }

  async load(token: LoadSessionByTokenRepository.Params): Promise<LoadSessionByTokenRepository.Result> {
    return this.loadBySessionTokenRepository.loadSessionByToken(token)
  }
}
