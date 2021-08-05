import { gql, useMutation, useQuery } from '@apollo/client';
import ListTemplate from '../components/templates/List';
import { Query, AddProjectInput, Mutation } from '../../graphql';

const List = () => {
  const { loading, data } = useQuery<Pick<Query, 'queryProject'>>(gql`
    query queryProjects {
      queryProject {
        id
        name
        vision
      }
    }
  `);

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

  return (
    !loading && (
      <ListTemplate
        items={data?.queryProject}
        title='name'
        description='vision'
        createFormMapping={{
          fields: [
            { fieldName: 'name', placeholder: 'Nom du projet', element: 'input', type: 'text' },
            { fieldName: 'vision', placeholder: 'Vision du projet', element: 'textarea' },
          ],
          focusFieldName: 'name',
        }}
        onSubmitCreate={(value) => value.name && addProjectMutation({ variables: { ...value, owner: 'tech@l-z.fr' } })}
      />
    )
  );
};

export default List;
