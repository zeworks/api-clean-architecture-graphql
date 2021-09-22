import { DeleteUserRepository, UpdateUserRepository } from "@/data/protocols/db";
import { db } from "@/infra/db/prisma";
import { adaptResolver } from "@/main/adapters"
import { UserInvalidError } from "@/presentation/errors";
import { forbidden } from "@/presentation/helpers";
import { makeUpdateUserController } from ".";
import { makeDeleteUserController } from "./delete-user-controller"

describe('DELETE_USER', () => {
  it('should delete user', async () => {
    try {
      const user = await db.user.findFirst();
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
    // delete user
    await adaptResolver<UpdateUserRepository.Params>(makeUpdateUserController(), { id: user.uuid, input: { active: false } });
    try {
      await adaptResolver<DeleteUserRepository.Params>(makeDeleteUserController(), { id: user.uuid });
    } catch (error) {
      // revert changes
      await adaptResolver<UpdateUserRepository.Params>(makeUpdateUserController(), { id: user.uuid, input: { active: true } });
      expect(error).toBe(forbidden(error).data);
    }

  })
})
