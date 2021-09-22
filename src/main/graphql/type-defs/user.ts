import { gql } from "apollo-server-express"

export default gql`
  extend type Mutation {
    createUser(input: CreateUserInput): User! @auth
    updateUser(input: UpdateUserInput, id: String): User! @auth
    deleteUser(id: String): Boolean! @auth
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
    password: String!
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    avatarUrl: String
    password: String
    roles: [Int]
    permissions: [Int]
  }
`;
