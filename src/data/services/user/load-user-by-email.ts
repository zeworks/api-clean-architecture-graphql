import { LoadUserByEmail } from '@/domain/usecases/user'
import { LoadUserByEmailRepository } from '@/data/protocols/db'

export class LoadUserByEmailService implements LoadUserByEmail {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) { }

  async load(input: LoadUserByEmailRepository.Params): Promise<LoadUserByEmailRepository.Result> {
    return this.loadUserByEmailRepository.load(input)
  }
}
