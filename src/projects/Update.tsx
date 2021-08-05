import { gql, MutationTuple, useMutation } from '@apollo/client';
import { Mutation, Project, ProjectFilter, ProjectRef } from '../../graphql';
import UpdateTemplate from '../components/templates/Update';

interface Props {
  project: Project;
}

const Update = ({ project }: Props) => {
  const [updateProjectMutation, _] = useMutation<MutationTuple<Pick<Mutation, 'updateProject'>, { id: string; name: string; vision: string }>>(gql`
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
    <UpdateTemplate
      object={project}
      formMapping={{
        fields: [
          { fieldName: 'name', placeholder: 'Nom du projet', element: 'input', type: 'text' },
          { fieldName: 'vision', placeholder: 'Vision du projet', element: 'textarea' },
        ],
        focusFieldName: 'name',
      }}
      onSubmit={(value: Partial<Project>) => {
        updateProjectMutation({ variables: { ...value } });
      }}
    />
  );
};

export default Update;
