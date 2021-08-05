import Link from 'next/link';
import { useRouter } from 'next/router';

import { PropsWithChildren, ReactElement, SVGProps } from 'react';

export interface TabDefinition {
  id: string;
  title: string;
  svgIcon: SVGProps<SVGSVGElement>;
}

interface Props {
  tabsDefinition: TabDefinition[];
}

const RootTemplate = ({ tabsDefinition, children }: PropsWithChildren<Props>) => {
  const router = useRouter();
  const path = router.asPath.split('?')[0];
  const tab = router.query.tab || tabsDefinition[0].id;
  const findTabClassName = (tabId: string) => `tab tab-bordered ${tab === tabId && 'tab-active'}`;

  return (
    <div className='m-2'>
      <div className='tabs'>
        {tabsDefinition.map((tabDefinition) => {
          return (
            <div className={findTabClassName(tabDefinition.id)}>
              <Link href={{ pathname: path, query: { tab: tabDefinition.id } }}>
                <a className='flex flex-row items-center'>
                  <div className='mr-1'>{tabDefinition.svgIcon}</div>
                  {tabDefinition.title}
                </a>
              </Link>
            </div>
          );
        })}
        <div className='flex-1 cursor-default tab tab-bordered' />
      </div>

      {tabsDefinition.map((tabDefinition, i) => {
        return <div className='mt-4'>{tab === tabDefinition.id && children[i]}</div>;
      })}
    </div>
  );
};

export default RootTemplate;
