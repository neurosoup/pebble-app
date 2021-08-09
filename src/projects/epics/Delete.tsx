import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { Mutation } from '../../../graphql';
import DeleteTemplate from '../../components/templates/Delete';
import { EPIC_FRAGMENT } from './epicFragment';

interface Props {
  projectId: string;
  epicId: string;
}

const Delete = ({ projectId, epicId }: Props) => {
  const [deleteEpicMutation, __] = useMutation<Pick<Mutation, 'deleteEpic'>, { id: string }>(
    gql`
      ${EPIC_FRAGMENT}
      mutation deleteEpic($id: ID!) {
        deleteEpic(filter: { id: [$id] }) {
          epic {
            ...EpicFields
          }
        }
      }
    `,
    {
      update: (cache) => {
        cache.modify({
          id: `Project:${projectId}`,
          fields: {
            epics(existing = [], { readField }) {
              return existing.filter((x) => readField('id', x) !== epicId);
            },
          },
        });
      },
    }
  );

  const router = useRouter();
  return <DeleteTemplate objectId={epicId} deleteMutationFunction={deleteEpicMutation} redirect={`/${router.query.project}`} />;
};

export default Delete;
