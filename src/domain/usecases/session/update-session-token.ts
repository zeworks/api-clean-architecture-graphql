import { Session } from "@/domain/entities"

export interface UpdateSessionToken {
  update: (input: UpdateSessionToken.Params) => Promise<UpdateSessionToken.Result>
}

export namespace UpdateSessionToken {
  export type Params = {
    token: string;
    id: string;
  }
  export type Result = Session | null
}
