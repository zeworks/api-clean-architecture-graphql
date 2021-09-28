import { GetUserByIdService, UpdateUserService } from '@/data/services/user'
import { BcryptAdapter } from '@/infra/adapters'
import { UserRepository } from '@/infra/repositories/user'
import { UpdateUserController } from '@/presentation/controllers/user'
import { Controller } from '@/presentation/protocols'
import { makeUpdateUserValidation } from './update-user-validation'

export const makeUpdateUserController = (): Controller => {
  const hashEncryter = new BcryptAdapter(8);
  const userRepository = new UserRepository();
  const getUserByIdRepository = new GetUserByIdService(userRepository);
  const updateUserService = new UpdateUserService(userRepository);
  return new UpdateUserController(makeUpdateUserValidation(), updateUserService, userRepository, hashEncryter)
}
