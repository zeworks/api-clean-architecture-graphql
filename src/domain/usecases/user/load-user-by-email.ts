import { User } from '@/domain/entities'

export interface LoadUserByEmail {
  load: (input: LoadUserByEmail.Params) => Promise<LoadUserByEmail.Result>
}

export namespace LoadUserByEmail {
  export type Params = string
  export type Result = User | null
}
