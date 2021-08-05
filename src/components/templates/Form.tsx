import { ChangeEvent, createRef, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';

export interface FormMapping {
  fields: {
    fieldName: string;
    element: string;
    type?: string;
    placeholder?: string;
  }[];
  focusFieldName?: string;
}

interface RefInfo<T> {
  fieldName: string;
  ref: MutableRefObject<T>;
}

interface Props<T> {
  object?: Partial<T>;
  onSubmit: (value: T) => void;
  onCancel?: VoidFunction;
  mapping: FormMapping;
}

export const FormTemplate = <T extends { id?: string }>({ object, onSubmit, onCancel, mapping }: Props<T>) => {
  const [value, setValue] = useState<Partial<T>>({});
  const [editing, setEditing] = useState(true);
  const refs = useRef<RefInfo<HTMLInputElement | HTMLTextAreaElement>[]>([]);
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        handleCancel(e);
      }
    };
    window.addEventListener('keydown', handleEsc);

    if (mapping.focusFieldName) {
      const refInfo = refs.current.find((x) => x.fieldName === mapping.focusFieldName);
      refInfo.ref.current?.focus();
      refInfo.ref.current?.select();
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleChange = (fieldName: string, event: ChangeEvent<EventTarget & { value: string }>) => {
    setEditing(true);
    setValue({ ...value, [fieldName]: event.target.value, id: object?.id });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
    refs.current?.forEach((x) => {
      x.ref.current?.blur();
    });
    formRef.current?.reset();
    onCancel && onCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(value as T);
    setEditing(false);
    formRef.current?.reset();
  };

  return (
    <form className='flex flex-col' ref={formRef} onSubmit={handleSubmit}>
      {mapping.fields.map((m) => {
        let element: JSX.Element;
        const properties = { key: m.fieldName, type: m.type, placeholder: m.placeholder, onFocus: () => setEditing(true), onBlur: () => setEditing(false), onChange: (e) => handleChange(m.fieldName, e) };
        switch (m.element) {
          case 'input':
            const textInputRef = createRef<HTMLInputElement>();
            element = <input {...properties} className='input input-ghost link-accent card-title' ref={textInputRef} defaultValue={object && object.hasOwnProperty(m.fieldName) ? object[m.fieldName] : undefined} />;
            refs.current = [...refs.current, { fieldName: m.fieldName, ref: textInputRef }];
            break;
          case 'textarea':
            const textAreaRef = createRef<HTMLTextAreaElement>();
            element = (
              <textarea
                {...properties}
                className='textarea textarea-ghost overflow-ellipsis overflow-hidden resize-none'
                ref={textAreaRef}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
                defaultValue={object && object.hasOwnProperty(m.fieldName) ? object[m.fieldName] : undefined}
              ></textarea>
            );
            refs.current = [...refs.current, { fieldName: m.fieldName, ref: textAreaRef }];
            break;

          default:
            break;
        }
        return element;
      })}
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
