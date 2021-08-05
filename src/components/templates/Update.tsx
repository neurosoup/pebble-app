import { FormTemplate, FormMapping } from './Form';

interface Props<T> {
  object: Partial<T>;
  formMapping: FormMapping;
  onSubmit: (value: Partial<T>) => void;
}

const UpdateTemplate = <T,>({ object, formMapping, onSubmit }: Props<T>) => {
  return (
    <FormTemplate
      object={object}
      mapping={formMapping}
      onSubmit={(value: Partial<T>) => {
        onSubmit(value);
      }}
    />
  );
};

export default UpdateTemplate;
