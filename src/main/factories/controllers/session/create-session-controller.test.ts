import { CreateSessionRepository } from "@/data/protocols/db"
import { adaptResolver } from "@/main/adapters"
import { UserInputError } from "apollo-server-errors"
import { makeCreateSessionController } from "./create-session-controller"

const session_details: CreateSessionRepository.Params = {
  email: "vensoftware@info.pt",
  password: "ven"
}

describe('CREATE_SESSION', () => {
  it('should create session', async () => {
    const result = await adaptResolver(makeCreateSessionController(), session_details);
    expect(result.email).toBe(session_details.email);
  })

  it('should not create session', async () => {
    try {
      await adaptResolver(makeCreateSessionController(), undefined);
    } catch (error) {
      expect(error.name).toBe(new UserInputError(error).name);
    }
  })
})
