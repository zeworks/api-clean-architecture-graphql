import { adaptResolver } from "@/main/adapters";
import { makeGetUsersController } from ".";

describe("GET USERS", () => {

  it('should return a list of users', async () => {
    const result = await adaptResolver(makeGetUsersController());
    expect(result.length).toBeGreaterThan(0);
  })
})
