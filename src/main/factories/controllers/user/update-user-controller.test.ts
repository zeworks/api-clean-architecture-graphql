import { UpdateUserRepository } from "@/data/protocols/db"
import { db } from "@/infra/db/prisma"
import { adaptResolver } from "@/main/adapters/apollo-server-resolver"
import { makeUpdateUserController } from "@/main/factories/controllers"
import { badRequest } from "@/presentation/helpers"

describe('UPDATE_USER', () => {

  it('should update an user with success', async () => {
    // get any user
    const user = await db.user.findFirst();

    // update the first user found
    const result = await adaptResolver<UpdateUserRepository.Params>(makeUpdateUserController(), {
      id: user.uuid,
      input: {
        active: true,
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

  it('should throw an error when not passing id of user', async () => {
    try {
      await adaptResolver(makeUpdateUserController());
    } catch (error) {
      expect(error).toBe(badRequest(error).data);
    }
  })
})
