import { gql } from "apollo-server-core";

export default gql`
  type Permission {
    id: Int!
    key: String!
    parent: Int
  }
`;
