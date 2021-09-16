import { makeAuthMiddleware } from "@/main/factories/middlewares";
import { SchemaDirectiveVisitor, ForbiddenError } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): any {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (parent, args, context, info) => {
      const request = {
        authorization: context?.req?.headers?.['authorization']
      }
      const httpResponse = await makeAuthMiddleware().handle(request)
      if (httpResponse.statusCode === 200) {
        Object.assign(context?.req, httpResponse.data)
        return resolve.call(this, parent, args, context, info)
      } else {
        throw new ForbiddenError(httpResponse.data.message)
      }
    }
  }
}
