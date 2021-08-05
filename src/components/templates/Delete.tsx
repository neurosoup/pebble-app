import { useEffect, useState } from 'react';
import Timer from '../../components/Timer';
import { useRouter } from 'next/router';

interface Props<T> {
  object: T;
  onDelete: (object: T) => void;
  redirect?: string;
}

const DeleteTemplate = <T,>({ object, onDelete, redirect }: Props<T>) => {
  const [deletionStep, setDeletionStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const deleteObject = async () => {
      onDelete(object);
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
