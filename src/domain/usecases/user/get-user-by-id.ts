import { User } from '@/domain/entities'

export interface GetUserById {
  get: (input: GetUserById.Params) => Promise<GetUserById.Result>
}

export namespace GetUserById {
  export type Params = string
  export type Result = User | null
}
