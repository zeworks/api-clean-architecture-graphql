import { UpdateSessionToken } from '@/domain/usecases/session'

export interface UpdateSessionTokenRepository {
  update: (input: UpdateSessionTokenRepository.Params) => Promise<UpdateSessionTokenRepository.Result>
}

export namespace UpdateSessionTokenRepository {
  export type Params = UpdateSessionToken.Params
  export type Result = UpdateSessionToken.Result
}
