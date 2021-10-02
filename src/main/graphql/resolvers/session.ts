import { adaptResolver } from "@/main/adapters/apollo-server-resolver";
import { makeCreateSessionController } from "@/main/factories/controllers";
import { makeGetSessionController } from "@/main/factories/controllers/session/get-session-controller";

export default {
  Query: {
    getSession: async (parent: any, args: any, context: any) => adaptResolver(makeGetSessionController(), args, context)
  },
  Mutation: {
    createSession: async (parent: any, args: any, context: any) => adaptResolver(makeCreateSessionController(), args, context)
  }
}
