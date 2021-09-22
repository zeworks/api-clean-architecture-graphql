import { adaptResolver } from "@/main/adapters/apollo-server-resolver";
import { makeCreateUserController } from "@/main/factories/controllers";
import { makeUpdateUserController } from "@/main/factories/controllers";
import { makeDeleteUserController } from "@/main/factories/controllers/user/delete-user-controller";

export default {
  Query: {},
  Mutation: {
    createUser: async (parent: any, args: any, context: any) => adaptResolver(makeCreateUserController(), args.input, context),
    updateUser: async (parent: any, args: any, context: any) => adaptResolver(makeUpdateUserController(), { input: args.input, id: args.id }, context),
    deleteUser: async (parent: any, args: any, content: any) => adaptResolver(makeDeleteUserController(), { id: args.id }, content)
  }
}
