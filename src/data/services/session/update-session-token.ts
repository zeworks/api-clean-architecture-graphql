import { UpdateSessionToken } from '@/domain/usecases/session'
import { UpdateSessionTokenRepository } from '@/data/protocols/db'

export class UpdateSessionTokenService implements UpdateSessionToken {
  constructor(
    private readonly updateSessionTokenRepository: UpdateSessionTokenRepository
  ) { }

  async update(token: UpdateSessionTokenRepository.Params): Promise<UpdateSessionTokenRepository.Result> {
    return this.updateSessionTokenRepository.update(token)
  }
}
