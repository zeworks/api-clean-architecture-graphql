import { GetUsers } from "@/domain/usecases";

export interface GetUsersRepository {
  getUsers: () => Promise<GetUsersRepository.Result>
}

export namespace GetUsersRepository {
  export type Result = GetUsers.Result
}
