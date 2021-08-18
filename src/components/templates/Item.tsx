import Link from 'next/link';
import { useRouter } from 'next/router';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface Props<T extends { id?: string }> {
  object: T;
  titleProperty: keyof T;
  descriptionProperty: keyof T;
}

const Item = <T extends { id?: string }>({ object, titleProperty, descriptionProperty }: Props<T>) => {
  const router = useRouter();
  const parts = router.pathname.split('/').filter((x) => x.length);
  const path = parts.reduce((previous, current) => {
    const part = current.replace('[', '').replace(']', '');
    const id = router.query[part];
    return `${previous}/${id}`;
  }, '');
  const href = `${path}/${object.id}`;

  return (
    <div className='card shadow compact bg-base-200 h-48'>
      <div className='card-body h-full overflow-hidden'>
        <Link href={href}>
          <a className='link link-hover link-accent card-title'>{object[titleProperty]}</a>
        </Link>
        <ReactMarkdown className='overflow-y-auto' remarkPlugins={[gfm]} children={`${object[descriptionProperty]}`}></ReactMarkdown>
      </div>
    </div>
  );
};

export default Item;

// className={`${i === a.length - 1 ? 'flex-none' : 'flex-shrink'} overscroll-y-auto overflow-ellipsis`}
