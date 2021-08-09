import { useRouter } from 'next/router';

import RootTemplate, { TabDefinition } from '../../src/components/templates/Root';
import UpdateProject from '../../src/projects/Update';
import DeleteProject from '../../src/projects/Delete';
import ListEpics from '../../src/projects/epics/List';

import { GET_PROJECT } from '../../src/projects/getProject';

import EpicIcon from '../../src/components/icons/Epics';
import DetailsIcon from '../../src/components/icons/Details';
import SettingsIcon from '../../src/components/icons/Settings';
import useGetById from '../../src/hooks/useGetById';

const tabsDefinition: TabDefinition[] = [
  {
    id: 'epics',
    title: 'Epics',
    svgIcon: <EpicIcon />,
  },
  {
    id: 'details',
    title: 'Détails',
    svgIcon: <DetailsIcon />,
  },
  {
    id: 'settings',
    title: 'Configuration',
    svgIcon: <SettingsIcon />,
  },
];

const Projects = () => {
  const router = useRouter();
  const { loading, data } = useGetById(GET_PROJECT, 'getProject', router.query.project);

  return router.isReady && data ? (
    <RootTemplate tabsDefinition={tabsDefinition}>
      <ListEpics projectId={data.id} />
      <UpdateProject project={data} />
      <DeleteProject projectId={data.id} />
    </RootTemplate>
  ) : (
    <></>
  );
};

export default Projects;
