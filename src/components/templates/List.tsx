import { useEffect, useState } from 'react';
import ItemTemplate from './Item';
import CreateTemplate from './Create';
import { FormMapping } from './Form';

interface Props<T extends { id?: string }> {
  items: T[];
  titleProperty: keyof T;
  descriptionProperty: keyof T;
  onSubmitCreate: (value: T) => void;
  createFormMapping: FormMapping<T>;
}

const ListTemplate = <T extends { id?: string }>({ items, titleProperty, descriptionProperty, onSubmitCreate, createFormMapping }: Props<T>) => {
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
    <div className='flex flex-wrap justify-start'>
      {items &&
        items.map((item) => (
          <div key={item.id} className='w-48 md:w-96 m-2 '>
            <ItemTemplate object={item} titleProperty={titleProperty} descriptionProperty={descriptionProperty} />
          </div>
        ))}
      {!create && (
        <button
          className='btn btn-circle btn-primary flex-grow-0  self-center m-6'
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
        <div className='flex-grow'>
          <CreateTemplate
            formMapping={createFormMapping}
            onClose={() => setCreate(false)}
            onSubmit={(value: T) => {
              onSubmitCreate(value);
              setCreate(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ListTemplate;
