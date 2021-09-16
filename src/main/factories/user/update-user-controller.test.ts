import { UpdateUserRepository } from "@/data/protocols/db"
import { db } from "@/infra/db/prisma"
import { adaptResolver } from "@/main/adapters/apollo-server-resolver"
import { makeUpdateUserController } from "@/main/factories/user"

describe('update user tests', () => {

  it('should update an user with success', async () => {
    // get any user
    const user = await db.user.findFirst();

    // update the first user found
    const result = await adaptResolver<UpdateUserRepository.Params>(makeUpdateUserController(), {
      id: user.uuid,
      input: {
        firstName: "User Updated"
      }
    });

    // revert the previous changes
    await adaptResolver<UpdateUserRepository.Params>(makeUpdateUserController(), {
      id: user.uuid,
      input: {
        firstName: user.firstName
      }
    });

    // test result
    expect(result.firstName).toBe("User Updated");
  })
})
