import { useEffect, useState } from 'react';
import ItemTemplate from './Item';
import CreateTemplate from './Create';
import { FormMapping } from './Form';

interface Props<T extends { id?: string }> {
  items: T[];
  title: keyof T;
  description: keyof T;
  onSubmitCreate: (value: T) => void;
  createFormMapping: FormMapping;
}

const ListTemplate = <T extends { id?: string }>({ items, title, description, onSubmitCreate, createFormMapping }: Props<T>) => {
  const [create, setCreate] = useState(false);

  useEffect(() => {
    const handleCreateShortcut = (e) => {
      if (e.keyCode === 187) {
        setCreate(true);
      }
    };
    window.addEventListener('keydown', handleCreateShortcut);

    return () => {
      window.removeEventListener('keydown', handleCreateShortcut);
    };
  }, []);

  return (
    <div className='grid items-center grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 m-2'>
      {items.map((item) => (
        <ItemTemplate key={item.id} object={item} title={title} description={description} />
      ))}
      {!create && (
        <button
          className='btn btn-circle btn-primary justify-self-center md:col-span-3'
          onClick={() => {
            setCreate(true);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
          </svg>
        </button>
      )}
      {create && (
        <CreateTemplate
          formMapping={createFormMapping}
          onClose={() => setCreate(false)}
          onSubmit={(value: T) => {
            onSubmitCreate(value);
            setCreate(false);
          }}
        />
      )}
    </div>
  );
};

export default ListTemplate;
