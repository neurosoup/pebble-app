import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Mutation } from '../../../../graphql';
import DeleteTemplate from '../../../components/templates/Delete';
import { STORY_FRAGMENT } from './storyFragment';

interface Props {
  epicId: string;
  storyId: string;
}

const Delete = ({ epicId, storyId }: Props) => {
  const [deleteStoryMutation, __] = useMutation<Pick<Mutation, 'deleteStory'>, { id: string }>(
    gql`
      ${STORY_FRAGMENT}
      mutation deleteStory($id: ID!) {
        deleteStory(filter: { id: [$id] }) {
          story {
            ...StoryFields
          }
        }
      }
    `,
    {
      update: (cache) => {
        cache.modify({
          id: `Epic:${epicId}`,
          fields: {
            epics(existing = [], { readField }) {
              return existing.filter((x) => readField('id', x) !== storyId);
            },
          },
        });
      },
    }
  );

  const router = useRouter();
  return <DeleteTemplate objectId={epicId} deleteMutationFunction={deleteStoryMutation} redirect={`/${router.query.project}/${router.query.epic}`} />;
};

export default Delete;
