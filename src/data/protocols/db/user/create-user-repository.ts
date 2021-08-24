import { CreateUser } from '@/domain/usecases/user'

export interface CreateUserRepository {
  create: (input: CreateUserRepository.Params) => Promise<CreateUserRepository.Result>
}

export namespace CreateUserRepository {
  export type Params = CreateUser.Params
  export type Result = CreateUser.Result
}
