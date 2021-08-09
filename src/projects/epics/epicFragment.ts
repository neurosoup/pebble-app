import { gql } from '@apollo/client';

export const EPIC_FRAGMENT = gql`
  fragment EpicFields on Epic {
    id
    title
    description
  }
`;
