import { gql, useMutation, useQuery } from '@apollo/client';
import ListTemplate from '../../../components/templates/List';
import { Mutation, Query, Story, UpdateEpicInput } from '../../../../graphql';
import { STORY_FRAGMENT } from './storyFragment';
import { EPIC_FRAGMENT } from '../epicFragment';
import STORY_FORM_MAPPING from './formMapping';

interface Props {
  projectId: string;
  epicId: string;
}

const List = ({ projectId, epicId }: Props) => {
  const { loading, data } = useQuery<Pick<Query, 'getProject'>, { projectId: string; epicId: string }>(
    gql`
      ${EPIC_FRAGMENT}
      ${STORY_FRAGMENT}
      query queryStories($projectId: ID!, $epicId: ID!) {
        getProject(id: $projectId) {
          id
          epics(filter: { id: [$epicId] }) {
            ...EpicFields
            stories {
              ...StoryFields
            }
          }
        }
      }
    `,
    { variables: { projectId, epicId } }
  );

  const [addStoryToEpic, _] = useMutation<Pick<Mutation, 'updateEpic'>, { patch: UpdateEpicInput }>(
    gql`
      ${STORY_FRAGMENT}
      mutation addStoryToEpic($patch: UpdateEpicInput!) {
        updateEpic(input: $patch) {
          epic {
            id
            stories {
              ...StoryFields
            }
          }
        }
      }
    `
  );

  const [updateStoryMutation, __] = useMutation<Pick<Mutation, 'updateStory'>, Story>(gql`
    mutation updateStory($id: ID!, $title: String, $description: String) {
      updateStory(input: { filter: { id: [$id] }, set: { title: $title, description: $description } }) {
        story {
          id
          title
          description
        }
      }
    }
  `);

  return (
    !loading && (
      <ListTemplate
        items={data?.getProject?.epics[0]?.stories}
        titleProperty='title'
        descriptionProperty='description'
        formMapping={STORY_FORM_MAPPING}
        updateMutationFunction={updateStoryMutation}
        onSubmitCreate={(story) =>
          story.title &&
          addStoryToEpic({
            variables: {
              patch: {
                filter: { id: [epicId] },
                set: {
                  stories: [{ title: story.title, description: story.description }],
                },
              },
            },
          })
        }
      />
    )
  );
};

export default List;
