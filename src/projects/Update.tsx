import { gql, MutationTuple, useMutation } from '@apollo/client';
import { Mutation, Project, ProjectFilter, ProjectRef } from '../../graphql';
import UpdateTemplate from '../components/templates/Update';
import PROJECT_FORM_MAPPING from './formMapping';

interface Props {
  project: Project;
}

const Update = ({ project }: Props) => {
  const [updateProjectMutation, _] = useMutation<Pick<Mutation, 'updateProject'>, { id: string; name: string; vision: string }>(gql`
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

  return <UpdateTemplate object={project} formMapping={PROJECT_FORM_MAPPING} updateMutationFunction={updateProjectMutation} />;
};

export default Update;
