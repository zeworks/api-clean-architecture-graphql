import { User } from '@/domain/entities'

export interface CreateUser {
  create: (input: CreateUser.Params) => Promise<CreateUser.Result>
}

export namespace CreateUser {
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
