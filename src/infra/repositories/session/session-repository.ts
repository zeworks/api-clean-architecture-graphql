import {
  UpdateSessionTokenRepository,
  LoadSessionByTokenRepository,
} from '@/data/protocols/db';
import { db } from '@/infra/db'

export class SessionRepository implements LoadSessionByTokenRepository, UpdateSessionTokenRepository {
  async loadSessionByToken(token: LoadSessionByTokenRepository.Params): Promise<LoadSessionByTokenRepository.Result> {
    const user = await db.user.findFirst({ where: { accessToken: token } })
    return user
  }

  /**
   * Update Session Token
   * 
   * @param input UpdateSessionTokenRepository.Params
   * @returns 
   */
  async update(input: UpdateSessionTokenRepository.Params): Promise<UpdateSessionTokenRepository.Result> {
    const session = await db.user.update({
      data: {
        accessToken: input.token,
      },
      where: {
        uuid: input.id
      },
      include: {
        permissions: true,
        roles: true
      }
    })

    return session
  }
}
