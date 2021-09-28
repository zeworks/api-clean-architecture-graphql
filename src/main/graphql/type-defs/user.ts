import { gql } from "apollo-server-express"

export default gql`
  extend type Query {
    getUser(id: String): User @auth
    getUsers: [Users] @auth
  }

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

  type Users {
    uuid: String!
    firstName: String!
    email: String!
    lastName: String
    avatarUrl: String
    active: Boolean!
    roles: [Role]
    permissions: [Permission]
  }

  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
    roles: [Int]
    permissions: [Int]
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
    avatarUrl: String
    password: String
    roles: [Int]
    permissions: [Int]
    active: Boolean
  }
`;
