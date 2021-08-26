import { gql } from "apollo-server-express"

export default gql`
  extend type Mutation {
    createUser(input: CreateUserInput): User! @auth
  }

  type User {
    uuid: String!
    firstName: String!
    email: String!
    lastName: String
    avatarUrl: String
    active: Boolean!
    accessToken: String
    roles: [Role]
    permissions: [Permission]
  }

  input CreateUserInput {
    firstName: String!
    lastName: String
    email: String!
    avatarUrl: String
    password: String!
    roles: [Int]
    permissions: [Int]
  }
`;
