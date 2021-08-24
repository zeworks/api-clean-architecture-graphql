import { CreateSession } from '@/domain/usecases/session'

export interface CreateSessionRepository {
  create: (input: CreateSessionRepository.Params) => Promise<CreateSessionRepository.Result>
}

export namespace CreateSessionRepository {
  export type Params = CreateSession.Params
  export type Result = CreateSession.Result
}
