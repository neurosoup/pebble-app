import { useMutation, gql } from '@apollo/client';
import { Mutation } from '../../graphql';
import DeleteTemplate from '../components/templates/Delete';

interface Props {
  projectId: string;
}

const Delete = ({ projectId }: Props) => {
  const [deleteProjectMutation, __] = useMutation<Pick<Mutation, 'deleteProject'>, { id: string }>(
    gql`
      mutation deleteProject($id: ID!) {
        deleteProject(filter: { id: [$id] }) {
          msg
          project {
            id
            name
          }
        }
      }
    `,
    {
      update: (cache) => {
        cache.modify({
          fields: {
            queryProject(existing = [], { readField }) {
              return existing.filter((x) => readField('id', x) !== projectId);
            },
          },
        });
      },
    }
  );

  return <DeleteTemplate objectId={projectId} deleteMutationFunction={deleteProjectMutation} redirect='/' />;
};

export default Delete;
