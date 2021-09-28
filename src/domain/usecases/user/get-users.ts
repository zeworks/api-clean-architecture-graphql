import { User } from '@/domain/entities'

export interface GetUsers {
  get: () => Promise<GetUsers.Result>
}

export namespace GetUsers {
  export type Result = Array<User>
}
