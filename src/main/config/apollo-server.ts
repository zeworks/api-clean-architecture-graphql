import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'
import schemaDirectives from '@/main/graphql/directives'

import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'

export const setupApolloServer = (app: Express): void => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    schemaDirectives,
    context: ({ req, res }) => ({ req, res }),
    formatError: (error) => {
      return {
        message: error.message
      }
    }
  })
  server.applyMiddleware({ app, cors: false, path: "/v1" })
}
