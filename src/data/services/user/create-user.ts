import { CreateUser } from '@/domain/usecases/user'
import { CreateUserRepository } from '@/data/protocols/db'

export class CreateUserService implements CreateUser {
  constructor(
    private readonly createUserRepository: CreateUserRepository
  ) { }

  async create(input: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    // Aqui podem ser aplicadas regras/excepções
    // DESDE QUE façam parte de regras de negocio
    return this.createUserRepository.create(input)
  }
}
