import { BcryptAdapter, JwtAdapter } from '@/infra/adapters'
import { SessionRepository } from '@/infra/repositories/session'
import { UserRepository } from '@/infra/repositories/user'
import { CreateSessionController } from '@/presentation/controllers/session'
import { Controller } from '@/presentation/protocols'

export const makeCreateSessionController = (): Controller => {
  const salt = 8
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const sessionRepository = new SessionRepository()
  const userRepository = new UserRepository()
  return new CreateSessionController(userRepository, bcryptAdapter, jwtAdapter, sessionRepository)
}
