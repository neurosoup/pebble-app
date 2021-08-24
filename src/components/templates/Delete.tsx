import { useEffect, useState } from 'react';
import Timer from '../../components/Timer';
import { useRouter } from 'next/router';
import { Mutation } from '../../../graphql';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';

interface Props<TData extends Pick<Mutation, keyof Mutation>> {
  objectId: string;
  onDelete?: VoidFunction;
  deleteMutationFunction: (options?: MutationFunctionOptions<TData, { id: string }>) => Promise<FetchResult<TData>>;
  redirect?: string;
}

const DeleteTemplate = <TData extends Pick<Mutation, keyof Mutation>>({ objectId, onDelete, redirect, deleteMutationFunction }: Props<TData>) => {
  const [deletionStep, setDeletionStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const deleteObject = async () => {
      onDelete && onDelete();
      await deleteMutationFunction({ variables: { id: objectId } });
      redirect && router.push(redirect);
    };

    if (deletionStep >= 2) {
      deleteObject();
    }
  }, [deletionStep]);

  return (
    <>
      <button className='btn btn-error' onClick={() => setDeletionStep(deletionStep + 1)} onBlur={() => setDeletionStep(0)}>
        {deletionStep === 0 ? (
          'Supprimer'
        ) : (
          <>
            Confirmer la suppression
            <div className='ml-1'>
              (<Timer time={3000} onEnd={() => setDeletionStep(0)} />)
            </div>
          </>
        )}
      </button>
    </>
  );
};

export default DeleteTemplate;
