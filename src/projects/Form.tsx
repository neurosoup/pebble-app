import { ChangeEvent, EventHandler, useEffect, useRef, useState } from 'react';
import { Project } from '../../graphql';

interface Props {
  project?: Partial<Project>;
  onSubmit: (updated: Partial<Project>) => void;
  onCancel?: VoidFunction;
}

const Form = ({ project, onSubmit, onCancel }: Props) => {
  const [updated, setUpdated] = useState<Partial<Project>>({});
  const [editing, setEditing] = useState(true);

  const formRef = useRef<HTMLFormElement>();
  const nameRef = useRef<HTMLInputElement>();
  const visionRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        handleCancel(e);
      }
    };
    window.addEventListener('keydown', handleEsc);

    nameRef.current?.focus();
    nameRef.current?.select();

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleChange = (fieldName: string, event: ChangeEvent<EventTarget & { value: string }>) => {
    setEditing(true);
    setUpdated({ ...updated, [fieldName]: event.target.value, id: project?.id });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
    nameRef.current?.blur();
    visionRef.current?.blur();
    formRef.current?.reset();
    onCancel && onCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(updated);
    setEditing(false);
    formRef.current?.reset();
  };

  return (
    <form className='flex flex-col' ref={formRef} onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Nom du projet'
        className='input input-ghost link-accent card-title'
        ref={nameRef}
        onFocus={() => setEditing(true)}
        onBlur={() => setEditing(false)}
        onChange={(e) => handleChange('name', e)}
        defaultValue={project?.name}
      />
      <textarea
        placeholder='Vision du projet'
        className='textarea textarea-ghost overflow-ellipsis overflow-hidden resize-none'
        ref={visionRef}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
        onFocus={() => setEditing(true)}
        onBlur={() => setEditing(false)}
        onChange={(e) => handleChange('vision', e)}
        defaultValue={project?.vision}
      ></textarea>
      {editing && (
        <div className='justify-end card-actions'>
          <button type='submit' className='btn btn-sm btn-circle btn-primary'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
            </svg>
          </button>
          <button type='button' name='cancel' className='btn btn-sm btn-circle btn-ghost' onClick={(e) => handleCancel(e)}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      )}
    </form>
  );
};

export default Form;
