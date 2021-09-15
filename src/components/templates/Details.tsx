import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import { Mutation } from '../../../graphql';
import { FormTemplate, FormMapping } from './Form';

interface Props<T, TData extends Pick<Mutation, keyof Mutation>, V = any> {
  object: T;
  formMapping: FormMapping<T, V>;
  onSubmit?: VoidFunction;
  updateMutationFunction?: (options?: MutationFunctionOptions<TData, T>) => Promise<FetchResult<TData>>;
  readonly: boolean;
}

const DetailsTemplate = <T, TData extends Pick<Mutation, keyof Mutation>>({ object, formMapping, onSubmit, updateMutationFunction, readonly }: Props<T, TData>) => {
  return (
    <FormTemplate
      object={object}
      mapping={formMapping}
      onSubmit={(value) => {
        onSubmit && onSubmit();
        updateMutationFunction && updateMutationFunction({ variables: { ...value } });
      }}
      readonly={readonly}
    />
  );
};

export default DetailsTemplate;
