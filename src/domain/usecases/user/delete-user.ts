export interface DeleteUserUseCase {
  delete: (id: string) => DeleteUserUseCase.Result;
}

export namespace DeleteUserUseCase {
  export type Result = Promise<boolean>;
}
