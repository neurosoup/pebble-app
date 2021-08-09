import { gql, useMutation } from '@apollo/client';
import { Mutation, Story } from '../../../../graphql';
import UpdateTemplate from '../../../components/templates/Update';
import STORY_FORM_MAPPING from './formMapping';

interface Props {
  story: Story;
}

const Update = ({ story }: Props) => {
  const [updateStoryMutation, _] = useMutation<Pick<Mutation, 'updateStory'>, { id: string; title: string; description: string }>(gql`
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

  return <UpdateTemplate object={story} formMapping={STORY_FORM_MAPPING} updateMutationFunction={updateStoryMutation} />;
};

export default Update;
