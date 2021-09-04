import { LoadUserById } from '@/domain/usecases/user'
import { LoadUserByIdRepository } from '@/data/protocols/db'

export class LoadUserByIdService implements LoadUserById {
  constructor(
    private readonly loadUserByIdRepository: LoadUserByIdRepository
  ) { }

  async load(input: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
    return this.loadUserByIdRepository.loadUserById(input)
  }
}
