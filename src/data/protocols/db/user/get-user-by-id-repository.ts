import { GetUserById } from '@/domain/usecases/user'

export interface GetUserByIdRepository {
  get: (id: string) => Promise<GetUserByIdRepository.Result>
}

export namespace GetUserByIdRepository {
  export type Params = {
    id: string
  }
  export type Result = GetUserById.Result
}
