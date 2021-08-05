import { useRouter } from 'next/router';
import UpdateProject from '../../src/projects/Update';
import DeleteProject from '../../src/projects/Delete';
import ListEpics from '../../src/epics/List';

import { GET_PROJECT } from '../../src/queries';
import { QueryResult, useQuery } from '@apollo/client';
import { Query, QueryGetProjectArgs } from '../../graphql';
import RootTemplate, { TabDefinition } from '../../src/components/templates/Root';

const tabsDefinition: TabDefinition[] = [
  {
    id: 'epics',
    title: 'Epics',
    svgIcon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
        <path fillRule='evenodd' d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z' clipRule='evenodd' />
      </svg>
    ),
  },
  {
    id: 'details',
    title: 'Détails',
    svgIcon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
        <path fillRule='evenodd' d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z' clipRule='evenodd' />
      </svg>
    ),
  },
  {
    id: 'settings',
    title: 'Configuration',
    svgIcon: (
      <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
        <path
          fillRule='evenodd'
          d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
          clipRule='evenodd'
        />
      </svg>
    ),
  },
];

const EpicList = () => {
  const router = useRouter();
  const { loading, data }: QueryResult<Pick<Query, 'getProject'>, QueryGetProjectArgs> = useQuery(GET_PROJECT, { variables: { id: router.query.project as string } });

  return (
    !loading && (
      <RootTemplate tabsDefinition={tabsDefinition}>
        <ListEpics projectId={data.getProject.id} />
        <UpdateProject project={data.getProject} />
        <DeleteProject project={data.getProject} />
      </RootTemplate>
    )
  );
};

export default EpicList;
