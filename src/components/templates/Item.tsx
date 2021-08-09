import Link from 'next/link';
import { useRouter } from 'next/router';

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
    <div className='card lg:card-side shadow shadow-md compact bg-base-200'>
      <div className='card-body'>
        <Link href={href}>
          <a className='link link-hover link-accent card-title'>{object[titleProperty]}</a>
        </Link>
        <div className='overflow-ellipsis overflow-hidden h-10'>{object[descriptionProperty] && object[descriptionProperty as string].split('\n').map((x, i) => <p key={i}>{x}</p>)}</div>
      </div>
    </div>
  );
};

export default Item;
