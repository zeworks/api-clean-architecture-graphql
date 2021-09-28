import { gql } from "apollo-server-express"

export default gql`
  extend type Mutation {
    createSession(email: String!, password: String!): Session
  }

  type Session {
    uuid: String!
    firstName: String!
    lastName: String
    email: String!
    accessToken: String!
  }
`;
