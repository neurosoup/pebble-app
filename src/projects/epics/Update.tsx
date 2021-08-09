import { gql, MutationTuple, useMutation } from '@apollo/client';
import { Epic, EpicRef, Mutation, Project, ProjectFilter, ProjectRef } from '../../../graphql';
import UpdateTemplate from '../../components/templates/Update';
import EPIC_FORM_MAPPING from './formMapping';

interface Props {
  epic: Epic;
}

const Update = ({ epic }: Props) => {
  const [updateEpicMutation, _] = useMutation<Pick<Mutation, 'updateEpic'>, { id: string; title: string; description: string }>(gql`
    mutation updateEpic($id: ID!, $title: String, $description: String) {
      updateEpic(input: { filter: { id: [$id] }, set: { title: $title, description: $description } }) {
        epic {
          id
          title
          description
        }
      }
    }
  `);

  return <UpdateTemplate object={epic} formMapping={EPIC_FORM_MAPPING} updateMutationFunction={updateEpicMutation} />;
};

export default Update;
