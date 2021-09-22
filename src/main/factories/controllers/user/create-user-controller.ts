import { CreateUserService } from '@/data/services/user'
import { BcryptAdapter } from '@/infra/adapters'
import { UUIDAdapter } from '@/infra/adapters/cryptography/uuid-adapter'
import { UserRepository } from '@/infra/repositories/user'
import { CreateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'

export const makeCreateUserController = (): Controller => {
  const uuidAdapter = new UUIDAdapter()
  const hashEncryter = new BcryptAdapter(8)
  const userRepository = new UserRepository()
  const service = new CreateUserService(userRepository)
  return new CreateUserController(service, userRepository, hashEncryter, uuidAdapter)
}
