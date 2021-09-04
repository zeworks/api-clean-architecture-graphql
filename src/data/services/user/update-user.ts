import { UpdateUser } from '@/domain/usecases/user'
import { UpdateUserRepository } from '@/data/protocols/db'

export class UpdateUserService implements UpdateUser {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository
  ) { }

  async update({ input, id }: UpdateUserRepository.Params): Promise<UpdateUserRepository.Result> {
    // Aqui podem ser aplicadas regras/excepções
    // DESDE QUE façam parte de regras de negocio
    return this.updateUserRepository.update({ input, id })
  }
}
