import { AuthenticationError, SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { verify } from "jsonwebtoken";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>): any {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (parent: any, args: any, context: any, info: any) => {

      const accessToken = context.req.headers?.authorization?.split(" ")[1] || '';

      if (!accessToken) {
        throw new AuthenticationError('Not authenticated')
      }

      try {
        const payload = verify(accessToken || "", process.env.JWT_SECRET || "ven-10a9")

        Object.assign(context?.req, {
          payload,
        });

        return resolve.call(this, parent, args, context, info)
      } catch (err) {
        console.log(err)
        throw new AuthenticationError('Not authenticated')
      }
    }
  }
}
