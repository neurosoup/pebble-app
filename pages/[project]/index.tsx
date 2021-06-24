import Link from 'next/link';
import { useRouter } from 'next/router';
import Update from '../../src/projects/Update';

enum TabNames {
  Details = 'details',
  Epics = 'epics',
}

const EpicList = () => {
  const router = useRouter();
  const path = router.asPath.split('?')[0];
  const tab = router.query.tab || TabNames.Epics;

  const findTabClassName = (tabName: string) => `tab tab-bordered ${tab === tabName && 'tab-active'}`;

  return (
    <div className='m-2'>
      <div className='tabs'>
        <div className={findTabClassName(TabNames.Epics)}>
          <Link href={{ pathname: path, query: { tab: 'epics' } }}>
            <a className='flex flex-row items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z' clipRule='evenodd' />
              </svg>
              Epics
            </a>
          </Link>
        </div>
        <div className={findTabClassName(TabNames.Details)}>
          <Link href={{ pathname: path, query: { tab: 'details' } }}>
            <a className='flex flex-row items-center'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
                <path
                  fillRule='evenodd'
                  d='M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z'
                  clipRule='evenodd'
                />
              </svg>
              Détails
            </a>
          </Link>
        </div>

        <div className='flex-1 cursor-default tab tab-bordered'></div>
      </div>
      <div className='mt-4'>
        {tab === TabNames.Details && <Update />}
        {tab === TabNames.Epics && <div>Epics list</div>}
      </div>
    </div>
  );
};

export default EpicList;
