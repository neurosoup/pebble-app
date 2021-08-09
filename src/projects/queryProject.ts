import { gql } from '@apollo/client';

export const QUERY_PROJECT = gql`
  query queryProjects {
    queryProject {
      id
      name
      vision
    }
  }
`;
