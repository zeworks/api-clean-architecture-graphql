import { DeleteUserService, GetUserByIdService } from "@/data/services/user";
import { UserRepository } from "@/infra/repositories/user";
import { DeleteUserController } from "@/presentation/controllers/user";
import { Controller } from "@/presentation/protocols";

export const makeDeleteUserController = (): Controller => {
  const userRepository = new UserRepository()
  const deleteUserService = new DeleteUserService(userRepository)
  const getUserByIDService = new GetUserByIdService(userRepository);
  return new DeleteUserController(deleteUserService, getUserByIDService);
}
