import { ChangeEvent, createRef, MutableRefObject, useEffect, useRef, useState } from 'react';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

export interface FormMapping<T> {
  fields: {
    fieldName: keyof T;
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

interface Props<T extends { id?: string }> {
  object?: T;
  onSubmit: (value: T) => void;
  onCancel?: VoidFunction;
  mapping: FormMapping<T>;
}

export const FormTemplate = <T extends { id?: string }>({ object, onSubmit, onCancel, mapping }: Props<T>) => {
  const [value, setValue] = useState<T>();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    value && onSubmit(value);
    setEditing(false);
  };
  handleCancel;
  return (
    <form className='flex flex-col flex-grow' ref={formRef} onSubmit={handleSubmit}>
      {mapping.fields.map((m) => {
        let element: JSX.Element;
        const properties = {
          key: m.fieldName as string,
          type: m.type,
          placeholder: m.placeholder,
          onFocus: () => setEditing(true),
          onChange: (e) => handleChange(m.fieldName as string, e),
        };
        switch (m.element) {
          case 'input':
            const textInputRef = createRef<HTMLInputElement>();
            element = <input {...properties} className='input input-ghost link-accent card-title flex-grow-0' ref={textInputRef} defaultValue={object && object.hasOwnProperty(m.fieldName) ? object[m.fieldName as string] : undefined} />;
            refs.current = [...refs.current, { fieldName: m.fieldName as string, ref: textInputRef }];
            break;
          case 'textarea':
            const value = object && object.hasOwnProperty(m.fieldName) ? object[m.fieldName as string] : undefined;
            if (editing) {
              const textAreaRef = createRef<HTMLTextAreaElement>();
              element = (
                <textarea
                  {...properties}
                  className='textarea textarea-ghost overflow-ellipsis overflow-hidden resize-none flex-grow'
                  ref={textAreaRef}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)}
                  defaultValue={value}
                ></textarea>
              );
              refs.current = [...refs.current, { fieldName: m.fieldName as string, ref: textAreaRef }];
            } else {
              element = (
                <div className='overflow-y-auto' onClick={() => setEditing(true)}>
                  <ReactMarkdown remarkPlugins={[gfm]} children={`${value}`} components={{ ul: (props) => <ul className='list-disc' {...props} /> }}></ReactMarkdown>
                </div>
              );
            }
            break;

          default:
            break;
        }
        return element;
      })}
      {editing && (
        <div className='justify-end card-actions flex-grow-0'>
          <button type='submit' className='btn btn-sm btn-circle btn-primary'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
            </svg>
          </button>
          <button type='button' name='cancel' className='btn btn-sm btn-circle btn-ghost' onClick={handleCancel}>
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
