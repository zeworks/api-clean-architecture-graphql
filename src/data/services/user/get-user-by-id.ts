import { GetUserById } from '@/domain/usecases/user'
import { GetUserByIdRepository } from '@/data/protocols/db'

export class GetUserByIdService implements GetUserById {
  constructor(
    private readonly getUserByIdRepository: GetUserByIdRepository
  ) { }

  async get(id: string): Promise<GetUserByIdRepository.Result> {
    return this.getUserByIdRepository.get(id)
  }
}
