import { adaptResolver } from "@/main/adapters/apollo-server-resolver";
import { makeCreateUserController } from "@/main/factories/user";
import { makeUpdateUserController } from "@/main/factories/user/update-user-controller";

export default {
  Query: {},
  Mutation: {
    createUser: async (parent: any, args: any, context: any) => adaptResolver(makeCreateUserController(), args.input, context),
    updateUser: async (parent: any, args: any, context: any) => adaptResolver(makeUpdateUserController(), { input: args.input, id: args.id }, context),
  }
}
