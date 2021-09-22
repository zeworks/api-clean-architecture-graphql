import { DeleteUserUseCase } from "@/domain/usecases";

export interface DeleteUserRepository {
  delete: (id: string) => DeleteUserRepository.Result
}

export namespace DeleteUserRepository {
  export type Params = {
    id: string;
  }
  export type Result = DeleteUserUseCase.Result
}
