import { gql, useMutation } from '@apollo/client';
import { Mutation, Story } from '../../../../graphql';
import DetailsTemplate from '../../../components/templates/Details';
import STORY_FORM_MAPPING from './formMapping';

interface Props {
  story: Story;
}

const Update = ({ story }: Props) => {
  const [updateStoryMutation, _] = useMutation<Pick<Mutation, 'updateStory'>, Story>(gql`
    mutation updateStory($id: ID!, $title: String, $description: String) {
      updateStory(input: { filter: { id: [$id] }, set: { title: $title, description: $description } }) {
        story {
          id
          title
          description
        }
      }
    }
  `);

  return <DetailsTemplate object={story} formMapping={STORY_FORM_MAPPING} updateMutationFunction={updateStoryMutation} />;
};

export default Update;
