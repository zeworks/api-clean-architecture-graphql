import { User } from '@/domain/entities'

export interface LoadUserById {
  load: (input: LoadUserById.Params) => Promise<LoadUserById.Result>
}

export namespace LoadUserById {
  export type Params = string
  export type Result = User | null
}
