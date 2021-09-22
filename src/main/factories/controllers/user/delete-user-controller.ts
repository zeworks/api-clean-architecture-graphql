import { DeleteUserService } from "@/data/services/user";
import { UserRepository } from "@/infra/repositories/user";
import { DeleteUserController } from "@/presentation/controllers/user";
import { Controller } from "@/presentation/protocols";

export const makeDeleteUserController = (): Controller => {
  const userRepository = new UserRepository()
  const service = new DeleteUserService(userRepository)
  return new DeleteUserController(service, userRepository);
}
