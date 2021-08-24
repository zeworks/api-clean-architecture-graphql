import { LoadSessionByToken } from '@/domain/usecases/session'

export interface LoadSessionByTokenRepository {
  loadSessionByToken: (token: LoadSessionByTokenRepository.Params) => Promise<LoadSessionByTokenRepository.Result>
}

export namespace LoadSessionByTokenRepository {
  export type Params = LoadSessionByToken.Params
  export type Result = LoadSessionByToken.Result
}
