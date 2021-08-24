import { adaptResolver } from "@/main/adapters/apollo-server-resolver";
import { makeCreateUserController } from "@/main/factories/user";

export default {
  Query: {},
  Mutation: {
    createUser: async (parent: any, args: any, context: any) => adaptResolver(makeCreateUserController(), args.input, context)
  }
}
