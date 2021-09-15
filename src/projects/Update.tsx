import { gql, MutationTuple, useMutation } from '@apollo/client';
import { Mutation, Project, ProjectFilter, ProjectRef } from '../../graphql';
import DetailsTemplate from '../components/templates/Details';
import PROJECT_FORM_MAPPING from './formMapping';

interface Props {
  project: Project;
}

const Update = ({ project }: Props) => {
  const [updateProjectMutation, _] = useMutation<Pick<Mutation, 'updateProject'>, Project>(gql`
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

  return <DetailsTemplate object={project} formMapping={PROJECT_FORM_MAPPING} updateMutationFunction={updateProjectMutation} />;
};

export default Update;
