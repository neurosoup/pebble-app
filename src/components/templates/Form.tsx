import { ChangeEvent, createRef, MutableRefObject, PropsWithChildren, useEffect, useRef, useState } from 'react';

import SwipeInput from '../SwipeInput';
import Markdown from '../Markdown';

interface FormFields<T, V> {
  fieldName: keyof T;
  element: string;
  type?: string;
  placeholder?: string;
  label?: string;
  values?: V[];
}

interface FormGroup<T, V> {
  orientation?: 'Horizontal' | 'Vertical';
  fields: FormFields<T, V>[];
}

export interface FormMapping<T, V = any> {
  groups?: FormGroup<T, V>[];
  focus?: string;
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
  readonly: boolean;
}

export const FormTemplate = <T extends { id?: string }>({ object, onSubmit, onCancel, mapping, readonly }: Props<T>) => {
  const [value, setValue] = useState<T>();
  const [editing, setEditing] = useState(false);
  const refs = useRef<RefInfo<HTMLInputElement | HTMLTextAreaElement>[]>([]);
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        handleCancel(e);
      }
    };
    window.addEventListener('keydown', handleEsc);

    if (!readonly && mapping.focus) {
      const refInfo = refs.current.find((x) => x.fieldName === mapping.focus);
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
    <form className='flex flex-col flex-grow overflow-hidden' ref={formRef} onSubmit={handleSubmit}>
      {mapping.groups.map((group) => {
        const elements = group.fields.reduce((children: JSX.Element[], field) => {
          let element: JSX.Element;
          const properties = {
            key: field.fieldName as string,
            type: field.type,
            placeholder: field.placeholder,
            onFocus: () => setEditing(true),
            onChange: (e) => handleChange(field.fieldName as string, e),
          };
          switch (field.element) {
            case 'swipe':
              element = (
                <div className='self-start p-2'>
                  <SwipeInput label={field.label} values={field.values} />
                </div>
              );
              break;
            case 'input':
              const textInputRef = createRef<HTMLInputElement>();
              element = (
                <input {...properties} className='input input-ghost link-accent card-title flex-grow-0' ref={textInputRef} defaultValue={object && object.hasOwnProperty(field.fieldName) ? object[field.fieldName as string] : undefined} />
              );
              refs.current = [...refs.current, { fieldName: field.fieldName as string, ref: textInputRef }];
              break;
            case 'textarea':
              const value = object && object.hasOwnProperty(field.fieldName) ? object[field.fieldName as string] : undefined;
              if (!readonly && editing) {
                const textAreaRef = createRef<HTMLTextAreaElement>();
                element = (
                  <div className='flex flex-col flex-grow'>
                    <textarea {...properties} className='textarea textarea-ghost resize-none h-full' ref={textAreaRef} onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit(e)} defaultValue={value}></textarea>
                  </div>
                );
                refs.current = [...refs.current, { fieldName: field.fieldName as string, ref: textAreaRef }];
              } else {
                element = (
                  <div className='overflow-y-auto overflow-x-hidden' onClick={() => !readonly && setEditing(true)}>
                    <Markdown children={`${value}`} {...properties} />
                  </div>
                );
              }
              break;

            default:
              break;
          }
          return [...children, element];
        }, []);
        return <div className={`flex ${group.orientation === 'Horizontal' ? 'flex-row' : 'flex-col h-full'}`}>{elements}</div>;
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
