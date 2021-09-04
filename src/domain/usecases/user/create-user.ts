import { User } from '@/domain/entities'

export interface CreateUserUseCase {
  create: (input: CreateUserUseCase.Params) => Promise<CreateUserUseCase.Result>
}

export namespace CreateUserUseCase {
  export type Params = {
    firstName: string
    lastName?: string | null
    email: string
    password: string
    avatarUrl?: string | null
    permissions?: Array<number> | null
    roles?: Array<number> | null
  }

  export type Result = User
}
