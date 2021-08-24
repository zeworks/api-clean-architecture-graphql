import { CreateUserService } from '@/data/services/user'
import { UserRepository } from '@/infra/repositories/user'
import { CreateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'

export const makeCreateUserController = (): Controller => {
  const userRepository = new UserRepository()
  const service = new CreateUserService(userRepository)
  return new CreateUserController(service)
}
