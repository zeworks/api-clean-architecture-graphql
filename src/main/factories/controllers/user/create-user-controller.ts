import { CreateUserService, LoadUserByEmailService } from '@/data/services/user'
import { BcryptAdapter } from '@/infra/adapters'
import { UUIDAdapter } from '@/infra/adapters/cryptography/uuid-adapter'
import { UserRepository } from '@/infra/repositories/user'
import { CreateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeCreateUserValidation } from './create-user-validation'

export const makeCreateUserController = (): Controller => {
  const uuidAdapter = new UUIDAdapter()
  const hashEncryter = new BcryptAdapter(8)
  const userRepository = new UserRepository()
  const createUserService = new CreateUserService(userRepository)
  const loadUserByEmailService = new LoadUserByEmailService(userRepository);

  return new CreateUserController(
    makeCreateUserValidation(),
    createUserService,
    loadUserByEmailService,
    hashEncryter,
    uuidAdapter
  )
}
