import { useRouter } from 'next/router';
import { APP_TITLE } from '../constants';
import useGetById from '../hooks/useGetById';
import { GET_EPIC } from '../projects/epics/getEpic';
import { GET_STORY } from '../projects/epics/stories/getStory';
import { GET_PROJECT } from '../projects/getProject';

const PageTitle = () => {
  const router = useRouter();
  const asPathArray = router.asPath.split('/').filter((x) => x.length);
  const level = asPathArray.length;

  const { data: projectData } = useGetById(GET_PROJECT, 'getProject', router.query.project);
  const { data: epicData } = useGetById(GET_EPIC, 'getEpic', router.query.epic);
  const { data: storyData } = useGetById(GET_STORY, 'getStory', router.query.story);

  let title: string;
  switch (level) {
    case 1:
      title = projectData?.name;
      break;

    case 2:
      title = epicData?.title;
      break;

    case 3:
      title = storyData?.title;
      break;

    default:
      title = APP_TITLE;
      break;
  }

  return <div className='text-2xl uppercase'>{title}</div>;
};

export default PageTitle;
