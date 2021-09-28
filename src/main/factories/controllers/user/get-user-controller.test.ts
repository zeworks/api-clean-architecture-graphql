import { GetUserByIdRepository } from "@/data/protocols/db";
import { db } from "@/infra/db/prisma"
import { adaptResolver } from "@/main/adapters";
import { FieldMissingError, UserInvalidError } from "@/presentation/errors";
import { makeGetUserController } from "./get-user-controller";

describe('GET_USER', () => {
  it('should get user by id', async () => {
    // get any user id from DB
    const user = await db.user.findFirst();

    const result = await adaptResolver<GetUserByIdRepository.Params>(makeGetUserController(), { id: user.uuid })
    expect(result.uuid).toBe(user.uuid);
  })

  it('should return error if user invalid', async () => {
    try {
      await adaptResolver<GetUserByIdRepository.Params>(makeGetUserController(), { id: "123" })
    } catch (error) {
      expect(error.message).toBe(new UserInvalidError().message);
    }
  })

  it('should return error if no ID sent', async () => {
    try {
      await adaptResolver(makeGetUserController())
    } catch (error) {
      expect(error.message).toBe(new FieldMissingError("id").message);
    }
  })
})
