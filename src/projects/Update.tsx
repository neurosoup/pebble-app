import { gql, MutationTuple, QueryResult, useMutation, useQuery } from '@apollo/client';
import { Mutation, Query, QueryGetProjectArgs } from '../../graphql';
import { useRouter } from 'next/router';
import { GET_PROJECT } from '../queries';
import Form from './Form';

const Update = () => {
  const router = useRouter();

  const { data }: QueryResult<Pick<Query, 'getProject'>, QueryGetProjectArgs> = useQuery(GET_PROJECT, { variables: { id: router.query.project as string } });

  const [updateProjectMutation, updateProjectResult] = useMutation<MutationTuple<Pick<Mutation, 'updateProject'>, { id: string; name?: string; vision?: string }>>(gql`
    mutation updateProject($id: ID!, $name: String, $vision: String) {
      updateProject(input: { filter: { id: [$id] }, set: { name: $name, vision: $vision } }) {
        project {
          id
          name
          vision
        }
      }
    }
  `);

  return <Form project={data?.getProject} onSubmit={(updated) => updateProjectMutation({ variables: { ...updated } })} />;
};

export default Update;
