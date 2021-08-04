import { gql, MutationTuple, useMutation } from '@apollo/client';
import { Mutation, Project } from '../../graphql';
import Form from './Form';

interface Props {
  project: Project;
}

const Update = ({ project }: Props) => {
  const [updateProjectMutation, updateProjectResult] = useMutation<MutationTuple<Pick<Mutation, 'updateProject'>, { id: string; name?: string; vision?: string }>>(gql`
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

  return <Form project={project} onSubmit={(updated) => updateProjectMutation({ variables: { ...updated } })} />;
};

export default Update;
