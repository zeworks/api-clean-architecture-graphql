import { adaptResolver } from "@/main/adapters/apollo-server-resolver";
import { makeCreateSessionController } from "@/main/factories/session";

export default {
  Query: {},
  Mutation: {
    createSession: async (parent: any, args: any, context: any) => adaptResolver(makeCreateSessionController(), args, context)
  }
}
