import { gql, MutationTuple, QueryResult, useMutation, useQuery } from '@apollo/client';
import ListTemplate from '../components/templates/List';
import { Mutation, Project, Query, UpdateProjectInput } from '../../graphql';

interface Props {
  projectId: string;
}

const List = ({ projectId }: Props) => {
  const { loading, data } = useQuery<Pick<Query, 'getProject'>, { projectId: string }>(
    gql`
      query queryEpics($projectId: ID!) {
        getProject(id: $projectId) {
          id
          epics {
            id
            name
            description
          }
        }
      }
    `,
    { variables: { projectId } }
  );

  const [addEpicToProject, addEpicToProjectResult] = useMutation<Pick<Mutation, 'updateProject'>, { patch: UpdateProjectInput }>(
    gql`
      mutation addEpicToProject($patch: UpdateProjectInput!) {
        updateProject(input: $patch) {
          project {
            id
            epics {
              id
              name
              description
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
        title='name'
        description='description'
        createFormMapping={{
          fields: [
            { fieldName: 'name', placeholder: "Titre de l'Epic", element: 'input', type: 'text' },
            { fieldName: 'description', placeholder: "Description de l'Epic", element: 'textarea' },
          ],
          focusFieldName: 'name',
        }}
        onSubmitCreate={(epic) =>
          epic.name &&
          addEpicToProject({
            variables: {
              patch: {
                filter: { id: [projectId] },
                set: {
                  epics: [{ name: epic.name, description: epic.description }],
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
