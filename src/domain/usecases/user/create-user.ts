import { User } from '@/domain/entities'

export interface CreateUser {
  create: (input: CreateUser.Params) => Promise<CreateUser.Result>
}

export namespace CreateUser {
  export type Params = {
    firstName: string
    lastName?: string | null
    email: string
  }

  export type Result = User
}
