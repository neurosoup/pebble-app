import Link from 'next/link';
import { useRouter } from 'next/router';

import { PropsWithChildren, SVGProps } from 'react';

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
    <div id='content-root' className='m-2 flex flex-col flex-grow'>
      <div className='tabs flex-grow-0'>
        {tabsDefinition.map((tabDefinition) => {
          return (
            <div key={tabDefinition.id} className={findTabClassName(tabDefinition.id)}>
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

      <div className='mt-4 flex flex-col flex-grow'>
        {tabsDefinition.map((tabDefinition, i) => {
          const isSelected = tab === tabDefinition.id;
          return (
            <div key={i} id={`${tabDefinition.id}-content`} className={`${isSelected ? 'order-first' : 'h-0'} flex flex-col flex-grow h-full`}>
              {tab === tabDefinition.id && (Array.isArray(children) ? children[i] : children)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RootTemplate;
