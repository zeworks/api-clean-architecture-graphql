import { gql } from "apollo-server-express"

export default gql`
  extend type Mutation {
    createUser(input: CreateUserInput): User! @auth
  }

  type User {
    uuid: String!
    firstName: String!
    lastName: String
    email: String!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String
    email: String!
  }
`;
