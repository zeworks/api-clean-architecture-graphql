import { db } from "@/infra/db/prisma";
import { adaptResolver } from "@/main/adapters"
import { FieldMissingError, ServerError } from "@/presentation/errors";
import { makeGetSessionController } from "./get-session-controller";

describe('GET_SESSION', () => {
  it('should get the session', async () => {
    const user = await db.user.findFirst();

    const session = await adaptResolver(makeGetSessionController(), null, {
      req: {
        headers: {
          authorization: `Bearer ${user.accessToken}`
        }
      }
    })

    expect(session.accessToken).toBe(user.accessToken)
  })

  it('should throw error if invalid access token', async () => {
    try {
      await adaptResolver(makeGetSessionController(), null, {
        req: {
          headers: {
            authorization: `Bearer 123`
          }
        }
      })
    } catch (error) {
      expect(error.message).toBe(new ServerError().message)
    }
  })

  it('should throw error if not authozation on headers', async () => {
    try {
      await adaptResolver(makeGetSessionController(), null, {
        req: {
          headers: {}
        }
      })
    } catch (error) {
      expect(error.message).toBe(new FieldMissingError('authorization').message)
    }
  })
})
