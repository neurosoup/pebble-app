import { gql, useMutation } from '@apollo/client';
import { Epic, Mutation } from '../../../graphql';
import DetailsTemplate from '../../components/templates/Details';
import EPIC_FORM_MAPPING from './formMapping';

interface Props {
  epic: Epic;
}

const Update = ({ epic }: Props) => {
  const [updateEpicMutation, _] = useMutation<Pick<Mutation, 'updateEpic'>, Epic>(gql`
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

  return <DetailsTemplate object={epic} formMapping={EPIC_FORM_MAPPING} updateMutationFunction={updateEpicMutation} />;
};

export default Update;
