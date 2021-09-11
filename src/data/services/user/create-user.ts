import { CreateUserUseCase } from '@/domain/usecases/user'
import { CreateUserRepository } from '@/data/protocols/db'

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private readonly createUserRepository: CreateUserRepository
  ) { }

  async create(input: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    return this.createUserRepository.create(input)
  }
}
