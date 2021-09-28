import { GetUsersRepository } from "@/data/protocols/db";
import { noContent, ok } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { GetUsersViewModel } from "@/presentation/view-models/user";

export class GetUsersController implements Controller {

  constructor(
    private readonly getUsersRepository: GetUsersRepository
  ) { }

  async handle(): Promise<HttpResponse<GetUsersViewModel>> {
    const data = await this.getUsersRepository.getUsers();

    if (data.length)
      return ok(data);

    return noContent()
  }
}
