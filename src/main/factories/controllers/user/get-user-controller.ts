import { GetUserByIdService } from "@/data/services/user";
import { UserRepository } from "@/infra/repositories/user";
import { GetUserController } from "@/presentation/controllers/user/get-user";
import { Controller } from "@/presentation/protocols";

export const makeGetUserController = (): Controller => {
  const userRepo = new UserRepository();
  const service = new GetUserByIdService(userRepo);
  return new GetUserController(service);
}
