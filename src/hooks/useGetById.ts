import { DocumentNode, useQuery } from '@apollo/client';
import { Query } from '../../graphql';

const useGetById = <TField extends keyof Query>(query: DocumentNode, field: TField, id?: string | string[]) => {
  const { loading, data } = useQuery<Pick<Query, TField>, { id: string }>(query, { skip: !id, variables: { id: Array.isArray(id) ? id[0] : id } });
  return { loading, data: data && data[field] };
};

export default useGetById;
