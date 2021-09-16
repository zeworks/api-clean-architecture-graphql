import { User } from '@/domain/entities'

export interface UpdateUser {
  update: (input: UpdateUser.Params) => Promise<UpdateUser.Result>
}

export namespace UpdateUser {
  export type Params = {
    id: string;
    input: {
      active?: boolean;
      firstName?: string
      lastName?: string | null
      password?: string
      avatarUrl?: string | null
      permissions?: Array<number> | null
      roles?: Array<number> | null
    }
  }

  export type Result = Omit<User, "password">
}
