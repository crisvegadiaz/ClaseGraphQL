import { gql } from "@apollo/client";

export const FIND_PERSON = gql`
  query FindPerson($name: String!) {
    findPerson(name: $name) {
      name
      phone
      id
      address {
        city
        street
      }
    }
  }
`;
