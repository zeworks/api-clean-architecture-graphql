import { Session } from "@/domain/entities"

export interface CreateSession {
  create: (input: CreateSession.Params) => Promise<CreateSession.Result>
}

export namespace CreateSession {
  export type Params = {
    email: string,
    password: string
  }
  export type Result = Session
}
