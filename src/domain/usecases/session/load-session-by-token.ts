import { Session } from "@/domain/entities"

export interface LoadSessionByToken {
  load: (token: LoadSessionByToken.Params) => Promise<LoadSessionByToken.Result>
}

export namespace LoadSessionByToken {
  export type Params = string
  export type Result = Session
}
