import { gql } from '@apollo/client';

export const STORY_FRAGMENT = gql`
  fragment StoryFields on Story {
    id
    title
    description
  }
`;
