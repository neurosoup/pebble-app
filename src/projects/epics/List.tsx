import { gql, useMutation, useQuery } from '@apollo/client';
import ListTemplate from '../../components/templates/List';
import { Mutation, Query, UpdateProjectInput } from '../../../graphql';
import { EPIC_FRAGMENT } from './epicFragment';
import EPIC_FORM_MAPPING from './formMapping';

interface Props {
  projectId: string;
}

const List = ({ projectId }: Props) => {
  const { loading, data } = useQuery<Pick<Query, 'getProject'>, { projectId: string }>(
    gql`
      ${EPIC_FRAGMENT}
      query queryEpics($projectId: ID!) {
        getProject(id: $projectId) {
          id
          epics {
            ...EpicFields
          }
        }
      }
    `,
    { variables: { projectId } }
  );

  const [addEpicToProject, _] = useMutation<Pick<Mutation, 'updateProject'>, { patch: UpdateProjectInput }>(
    gql`
      ${EPIC_FRAGMENT}
      mutation addEpicToProject($patch: UpdateProjectInput!) {
        updateProject(input: $patch) {
          project {
            id
            epics {
              ...EpicFields
            }
          }
        }
      }
    `
  );

  return (
    !loading && (
      <ListTemplate
        items={data?.getProject?.epics}
        titleProperty='title'
        descriptionProperty='description'
        createFormMapping={EPIC_FORM_MAPPING}
        onSubmitCreate={(epic) =>
          epic.title &&
          addEpicToProject({
            variables: {
              patch: {
                filter: { id: [projectId] },
                set: {
                  epics: [{ title: epic.title, description: epic.description }],
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
