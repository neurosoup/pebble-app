import { gql } from '@apollo/client';

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      vision
    }
  }
`;
