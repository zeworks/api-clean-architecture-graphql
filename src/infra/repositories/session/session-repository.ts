import {
  CreateSessionRepository,
  LoadSessionByTokenRepository,
  UpdateSessionTokenRepository
} from '@/data/protocols/db';
import { db } from '@/infra/db'
// import { UserInvalidError } from '@/infra/errors/user';

export class SessionRepository implements LoadSessionByTokenRepository {

  // async create({ email, password }: CreateSessionRepository.Params): Promise<CreateSessionRepository.Result> {
  //   // fetch user
  //   const user = await db.user.findFirst({ where: { email, active: true } })

  //   // user don't exist
  //   if (!user) {
  //     throw new UserInvalidError()
  //   }

  //   // validate password
  //   // // const passwordValid = await this.hashComparer.compare(password, user.password)

  //   // if (!passwordValid) {
  //   //   throw new UserInvalidError()
  //   // }

  //   // // Update user token on DB
  //   // Object.assign(user, { accessToken: await this.createAccessTokenRepository.create(user.uuid) })

  //   const newData = await db.user.update({
  //     data: user,
  //     where: { uuid: user.uuid },
  //     include: { roles: true, permissions: true }
  //   })

  //   return newData
  // }

  async loadSessionByToken(token: LoadSessionByTokenRepository.Params): Promise<LoadSessionByTokenRepository.Result> {
    const user = await db.user.findFirst({ where: { accessToken: token } })
    return user
  }

  async updateSessionToken(input: UpdateSessionTokenRepository.Params): Promise<UpdateSessionTokenRepository.Result> {
    const session = await db.user.update({
      data: {
        accessToken: input.token,
      },
      where: {
        uuid: input.id
      }
    })

    return session
  }
}
