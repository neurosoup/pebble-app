import { useRouter } from 'next/router';

import Breadcrumbs from './Breadcrumbs';

import { GET_PROJECT } from '../projects/getProject';
import { GET_EPIC } from '../projects/epics/getEpic';
import { GET_STORY } from '../projects/epics/stories/getStory';
import useGetById from '../hooks/useGetById';

import HomeIcon from './icons/Home';
import ProjectIcon from './icons/Project';
import EpicIcon from './icons/Epics';

const DynamicBreadcrumbs = () => {
  const router = useRouter();

  const {
    query: { project, epic, story },
  } = router;

  const { loading: getProjectLoading, data: projectData } = useGetById(GET_PROJECT, 'getProject', project);
  const { loading: getEpicLoading, data: epicData } = useGetById(GET_EPIC, 'getEpic', epic);
  const { loading: getStoryLoading, data: storyData } = useGetById(GET_STORY, 'getStory', story);

  return (
    <Breadcrumbs
      loadingLevel={(getProjectLoading && 1) || (getEpicLoading && 2)}
      transformLabel={(breadcrumb) => {
        switch (breadcrumb.pathname) {
          case '':
            return {
              //label: 'Accueil',
              svgIcon: <HomeIcon />,
            };

          case 'project':
            return {
              label: projectData?.name,
              // svgIcon: <ProjectIcon />
            };

          case 'epic':
            return {
              label: epicData?.title,
              // svgIcon: <EpicIcon />,
            };

          case 'story':
            return {
              label: storyData?.title,
              // svgIcon: <EpicIcon />,
            };

          default:
            break;
        }
      }}
    />
  );
};

export default DynamicBreadcrumbs;
