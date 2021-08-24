import { CreateSessionService } from '@/data/services/session'
import { BcryptAdapter, JwtAdapter } from '@/infra/adapters'
import { SessionRepository } from '@/infra/repositories/session'
import { CreateSessionController } from '@/presentation/controllers/session'
import { Controller } from '@/presentation/protocols'

export const makeCreateSessionController = (): Controller => {
  const salt = 8
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter("")
  const userRepository = new SessionRepository()
  const service = new CreateSessionService(userRepository)
  return new CreateSessionController(service, userRepository, bcryptAdapter, jwtAdapter, userRepository)
}
