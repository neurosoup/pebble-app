import { gql, useMutation, useQuery } from '@apollo/client';
import ListTemplate from '../components/templates/List';
import { Query, AddProjectInput, Mutation, Project } from '../../graphql';
import PROJECT_FORM_MAPPING from './formMapping';
import { QUERY_PROJECT } from './queryProject';

const List = () => {
  const { loading, data } = useQuery<Pick<Query, 'queryProject'>>(QUERY_PROJECT);

  const [addProjectMutation, _] = useMutation<Pick<Mutation, 'addProject'>, AddProjectInput>(
    gql`
      mutation addProject($name: String!, $vision: String, $owner: String!) {
        addProject(input: { name: $name, vision: $vision, owner: $owner }) {
          project {
            id
            name
            vision
          }
        }
      }
    `,
    {
      update: (cache, { data: { addProject } }) => {
        cache.modify({
          fields: {
            queryProject(existing = []) {
              const newProjectRef = cache.writeFragment({
                data: addProject.project[0],
                fragment: gql`
                  fragment NewProject on Project {
                    id
                    name
                    vision
                  }
                `,
              });
              return [...existing, newProjectRef];
            },
          },
        });
      },
    }
  );

  const [updateProjectMutation, __] = useMutation<Pick<Mutation, 'updateProject'>, Project>(gql`
    mutation updateProject($id: ID!, $name: String, $vision: String) {
      updateProject(input: { filter: { id: [$id] }, set: { name: $name, vision: $vision } }) {
        project {
          id
          name
          vision
        }
      }
    }
  `);

  return (
    !loading && (
      <ListTemplate
        items={data?.queryProject}
        titleProperty='name'
        descriptionProperty='vision'
        formMapping={PROJECT_FORM_MAPPING}
        updateMutationFunction={updateProjectMutation}
        onSubmitCreate={(value) => value.name && addProjectMutation({ variables: { ...value, owner: 'tech@l-z.fr' } })}
      />
    )
  );
};

export default List;
