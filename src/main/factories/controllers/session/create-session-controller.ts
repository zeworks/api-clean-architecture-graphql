import { UpdateSessionTokenService } from '@/data/services/session'
import { CreateSessionService } from '@/data/services/session/create-session-service'
import { LoadUserByEmailService } from '@/data/services/user'
import { BcryptAdapter, JwtAdapter } from '@/infra/adapters'
import { SessionRepository } from '@/infra/repositories/session'
import { UserRepository } from '@/infra/repositories/user'
import { CreateSessionController } from '@/presentation/controllers/session'
import { Controller } from '@/presentation/protocols'
import { makeCreateSessionValidation } from './create-session-validation'

export const makeCreateSessionController = (): Controller => {
  const salt = 8
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET)
  const sessionRepository = new SessionRepository()
  const userRepository = new UserRepository()
  const updateSessionTokenService = new UpdateSessionTokenService(sessionRepository)
  const loadUserByEmailService = new LoadUserByEmailService(userRepository);
  return new CreateSessionController(makeCreateSessionValidation(), loadUserByEmailService, bcryptAdapter, jwtAdapter, updateSessionTokenService)
}
