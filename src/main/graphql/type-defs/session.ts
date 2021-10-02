import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    getSession: Session
  }

  extend type Mutation {
    createSession(email: String!, password: String!): Session
  }

  type Session {
    uuid: String!
    firstName: String!
    lastName: String
    email: String!
    accessToken: String!
    avatarUrl: String
  }
`;
