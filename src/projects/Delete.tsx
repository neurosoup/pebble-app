import { MutationTuple, useMutation, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Mutation, Project } from '../../graphql';
import { useRouter } from 'next/router';

interface Props {
  project: Project;
}

const Delete = ({ project }: Props) => {
  const router = useRouter();
  const [deletionStep, setDeletionStep] = useState(0);
  const [deleteProjectMutation, __]: MutationTuple<Pick<Mutation, 'deleteProject'>, { id: string }> = useMutation(
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
              return existing.filter((x) => readField('id', x) !== project.id);
            },
          },
        });
      },
    }
  );

  useEffect(() => {
    const deleteThisProject = async () => {
      await deleteProjectMutation({ variables: { id: project.id } });
      router.push('/');
    };

    if (deletionStep >= 2) {
      deleteThisProject();
    }
  }, [deletionStep]);

  return (
    <>
      <button className='btn btn-error' onClick={() => setDeletionStep(deletionStep + 1)}>
        {deletionStep === 0 ? 'Supprimer ce projet' : 'Confirmer la suppression'}
      </button>
    </>
  );
};

export default Delete;
