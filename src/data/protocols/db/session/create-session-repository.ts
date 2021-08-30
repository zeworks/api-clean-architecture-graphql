import { CreateSession } from '@/domain/usecases/session'

export interface CreateSessionRepository {
  create: (input: CreateSessionRepository.Params) => Promise<CreateSessionRepository.Result>
}

export namespace CreateSessionRepository {
  export type Params = {
    email: string
    password: string
  }
  export type Result = CreateSession.Result
}
