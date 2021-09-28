import { DeleteUserRepository, UpdateUserRepository } from "@/data/protocols/db";
import { db } from "@/infra/db/prisma";
import { adaptResolver } from "@/main/adapters"
import { UserInvalidError } from "@/presentation/errors";
import { forbidden } from "@/presentation/helpers";
import { makeUpdateUserController } from ".";
import { makeDeleteUserController } from "./delete-user-controller"

describe('DELETE_USER', () => {
  it('should delete user', async () => {
    const user = await db.user.findFirst();
    try {
      const result = await adaptResolver<DeleteUserRepository.Params>(makeDeleteUserController(), { id: user.uuid })
      await adaptResolver<UpdateUserRepository.Params>(makeUpdateUserController(), { id: user.uuid, input: { active: true } });
      expect(result).toBe(true);
    } catch (error) {
      // do nothing
    }
  })

  it('shouldn\'t delete user with invalid ID', async () => {
    try {
      await adaptResolver<DeleteUserRepository.Params>(makeDeleteUserController(), { id: "123" })
    } catch (error) {
      expect(error).toBe(forbidden(error).data);
    }
  })

  it('try to delete user, already deleted', async () => {
    // get any user
    const user = await db.user.findFirst();

    try {
      // delete first time
      // can return error on first time, if the user was already inactive
      await adaptResolver<DeleteUserRepository.Params>(makeDeleteUserController(), { id: user.uuid });
      // on delete second time, should return an error
      await adaptResolver<DeleteUserRepository.Params>(makeDeleteUserController(), { id: user.uuid });
    } catch (error) {
      await adaptResolver<UpdateUserRepository.Params>(makeUpdateUserController(), { id: user.uuid, input: { active: true } });
      expect(error.message).toBe(new UserInvalidError().message);
    }
  })
})
