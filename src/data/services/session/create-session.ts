import { CreateSession } from '@/domain/usecases/session'
import { CreateSessionRepository } from '@/data/protocols/db'

export class CreateSessionService implements CreateSession {
  constructor(
    private readonly createSessionRepository: CreateSessionRepository
  ) { }

  async create(input: CreateSessionRepository.Params): Promise<CreateSessionRepository.Result> {
    // Aqui podem ser aplicadas regras/excepções
    // DESDE QUE façam parte de regras de negocio
    return this.createSessionRepository.create(input)
  }
}
