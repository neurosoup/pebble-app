import { useRouter } from 'next/router';
import Breadcrumbs from './Breadcrumbs';
import { GET_PROJECT } from '../../src/queries';
import { QueryResult, useQuery } from '@apollo/client';
import { Query, QueryGetProjectArgs } from '../../graphql';

const DynamicBreadcrumbs = () => {
  const router = useRouter();

  const {
    query: { project },
  } = router;

  const { loading: getProjectLoading, data: getProjectData }: QueryResult<Pick<Query, 'getProject'>, QueryGetProjectArgs> = useQuery(GET_PROJECT, { skip: !project, variables: { id: project as string } });

  return (
    <Breadcrumbs
      loading={getProjectLoading}
      transformLabel={(breadcrumb) => {
        switch (breadcrumb.pathname) {
          case 'project':
            return getProjectData?.getProject?.name;

          default:
            break;
        }
      }}
    />
  );
};

export default DynamicBreadcrumbs;
