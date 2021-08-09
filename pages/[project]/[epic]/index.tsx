import { useRouter } from 'next/router';

import RootTemplate, { TabDefinition } from '../../../src/components/templates/Root';
import ListStories from '../../../src/projects/epics/stories/List';

import DetailsIcon from '../../../src/components/icons/Details';
import SettingsIcon from '../../../src/components/icons/Settings';
import StoryIcon from '../../../src/components/icons/Story';
import { GET_EPIC } from '../../../src/projects/epics/getEpic';

import UpdateEpic from '../../../src/projects/epics/Update';
import DeleteEpic from '../../../src/projects/epics/Delete';
import useGetById from '../../../src/hooks/useGetById';

const tabsDefinition: TabDefinition[] = [
  {
    id: 'stories',
    title: 'Stories',
    svgIcon: <StoryIcon />,
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

const Epics = () => {
  const router = useRouter();
  const { loading, data } = useGetById(GET_EPIC, 'getEpic', router.query.epic);

  return router.isReady && data ? (
    <RootTemplate tabsDefinition={tabsDefinition}>
      <ListStories projectId={router.query.project as string} epicId={data.id} />
      <UpdateEpic epic={data} />
      <DeleteEpic projectId={router.query.project as string} epicId={data.id} />
    </RootTemplate>
  ) : (
    <></>
  );
};

export default Epics;
