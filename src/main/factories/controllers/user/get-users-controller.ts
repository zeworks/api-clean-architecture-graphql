import { GetUsersService } from "@/data/services/user";
import { UserRepository } from "@/infra/repositories/user";
import { GetUsersController } from "@/presentation/controllers/user";
import { Controller } from "@/presentation/protocols";

export const makeGetUsersController = (): Controller => {
  const userRepository = new UserRepository();
  const getUserService = new GetUsersService(userRepository);
  return new GetUsersController(getUserService)
}
