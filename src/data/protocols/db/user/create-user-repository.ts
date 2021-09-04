import { CreateUserUseCase } from '@/domain/usecases/user'

export interface CreateUserRepository {
  create: (input: CreateUserRepository.Params) => Promise<CreateUserRepository.Result>
}

export namespace CreateUserRepository {
  export type Params = CreateUserUseCase.Params & {
    uuid: string
  }
  export type Result = CreateUserUseCase.Result
}
