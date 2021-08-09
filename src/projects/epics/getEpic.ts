import { gql } from '@apollo/client';
import { EPIC_FRAGMENT } from './epicFragment';

export const GET_EPIC = gql`
  ${EPIC_FRAGMENT}
  query getEpic($id: ID!) {
    getEpic(id: $id) {
      ...EpicFields
    }
  }
`;
