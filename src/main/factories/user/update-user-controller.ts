import { UpdateUserService } from '@/data/services/user'
import { BcryptAdapter } from '@/infra/adapters'
import { UserRepository } from '@/infra/repositories/user'
import { UpdateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'

export const makeUpdateUserController = (): Controller => {
  const hashEncryter = new BcryptAdapter(8)
  const userRepository = new UserRepository()
  const service = new UpdateUserService(userRepository)
  return new UpdateUserController(service, userRepository, hashEncryter)
}
