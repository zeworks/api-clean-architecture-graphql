import { CreateSession } from '@/domain/usecases/session'
import { CreateSessionRepository } from '@/data/protocols/db'

export class CreateSessionService implements CreateSession {
  constructor(
    private readonly createSessionRepository: CreateSessionRepository
  ) { }

  async create(input: CreateSessionRepository.Params): Promise<CreateSessionRepository.Result> {
    return this.createSessionRepository.create(input)
  }
}
