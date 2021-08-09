import { gql } from '@apollo/client';
import { STORY_FRAGMENT } from './storyFragment';

export const GET_STORY = gql`
  ${STORY_FRAGMENT}
  query getStory($id: ID!) {
    getStory(id: $id) {
      ...StoryFields
    }
  }
`;
