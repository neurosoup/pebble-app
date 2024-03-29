import { gql, useMutation, useQuery } from '@apollo/client';
import ListTemplate from '../../../components/templates/List';
import { Mutation, Query, UpdateEpicInput } from '../../../../graphql';
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

  return (
    !loading && (
      <ListTemplate
        items={data?.getProject?.epics[0]?.stories}
        titleProperty='title'
        descriptionProperty='description'
        createFormMapping={STORY_FORM_MAPPING}
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
