import { gql } from "apollo-server-core";

export default gql`
  type Role {
    id: Int!
    name: String!
  }
`;
