import { CreateUserRepository } from "@/data/protocols/db"
import { db } from "@/infra/db/prisma"
import { adaptResolver } from "@/main/adapters/apollo-server-resolver"
import { makeCreateUserController } from "@/main/factories/controllers"
import { EmailInUseError } from "@/presentation/errors"
import { UserInputError } from "apollo-server-errors"

describe('CREATE_USER', () => {

  const user_mock = {
    firstName: "First Name User Mock",
    email: "user@mock.com",
    password: "mocked",
  }

  it('shoulld create user', async () => {
    const user = await adaptResolver(makeCreateUserController(), user_mock);
    await db.user.delete({ where: { uuid: user.uuid } })
    expect(user.email).toBe(user_mock.email);
  })

  it('sould return an error trying to create an existing user', async () => {
    const user = await adaptResolver(makeCreateUserController(), user_mock);
    try {
      await adaptResolver(makeCreateUserController(), user_mock);
    } catch (error) {
      await db.user.delete({ where: { uuid: user.uuid } })
      expect(error.message).toBe(new EmailInUseError().message);
    }
  });

  it('should return error on create user without email', async () => {
    try {
      const user = await adaptResolver<Partial<CreateUserRepository.Params>>(makeCreateUserController(), { ...user_mock, email: undefined }) as CreateUserRepository.Result;
      await db.user.delete({ where: { uuid: user.uuid } })
    } catch (error) {
      expect(error.name).toBe(new UserInputError(error).name);
    }
  })
})
