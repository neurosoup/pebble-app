import { useRouter } from 'next/router';

import RootTemplate, { TabDefinition } from '../../../../src/components/templates/Root';

import DetailsIcon from '../../../../src/components/icons/Details';
import SettingsIcon from '../../../../src/components/icons/Settings';
import { GET_STORY } from '../../../../src/projects/epics/stories/getStory';

import UpdateStory from '../../../../src/projects/epics/stories/Update';
import DeleteStory from '../../../../src/projects/epics/stories/Delete';
import useGetById from '../../../../src/hooks/useGetById';

const tabsDefinition: TabDefinition[] = [
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

const Story = () => {
  const router = useRouter();
  const { loading, data } = useGetById(GET_STORY, 'getStory', router.query.story);

  return router.isReady && data ? (
    <RootTemplate tabsDefinition={tabsDefinition}>
      <UpdateStory story={data} />
      <DeleteStory epicId={router.query.epic as string} storyId={data.id} />
    </RootTemplate>
  ) : (
    <></>
  );
};

export default Story;
