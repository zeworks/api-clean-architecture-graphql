import { LoadUserByEmail } from '@/domain/usecases/user'

export interface LoadUserByEmailRepository {
  loadUserByEmail: (input: LoadUserByEmailRepository.Params) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository {
  export type Params = LoadUserByEmail.Params
  export type Result = LoadUserByEmail.Result
}
