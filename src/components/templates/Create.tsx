import { FormTemplate, FormMapping } from './Form';

interface Props<T> {
  onClose: VoidFunction;
  onSubmit: (value: T) => void;
  formMapping: FormMapping;
}

const CreateTemplate = <T,>({ onClose, onSubmit, formMapping }: Props<T>) => {
  return (
    <div className={`card lg:card-side bordered shadow shadow-md bg-base-100 compact md:col-span-3 lg:col-span-4`}>
      <div className='card-body'>
        <FormTemplate
          key='createNew'
          mapping={formMapping}
          onSubmit={(value: T) => {
            onSubmit(value);
            onClose();
          }}
          onCancel={() => onClose()}
        />
      </div>
    </div>
  );
};

export default CreateTemplate;
