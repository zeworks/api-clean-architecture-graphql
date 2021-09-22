import { LoadUserById } from '@/domain/usecases/user'

export interface LoadUserByIdRepository {
  loadUserById: (id: LoadUserByIdRepository.Params) => Promise<LoadUserByIdRepository.Result>
}

export namespace LoadUserByIdRepository {
  export type Params = LoadUserById.Params
  export type Result = LoadUserById.Result
}
