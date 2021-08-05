import Link from 'next/link';

interface Props<T extends { id?: string }> {
  object: T;
  title: keyof T;
  description: keyof T;
}

const Item = <T extends { id?: string }>({ object, title, description }: Props<T>) => {
  return (
    <div className='card lg:card-side shadow shadow-md compact bg-base-200'>
      <div className='card-body'>
        <Link href={`/${encodeURIComponent(object.id)}`}>
          <a className='link link-hover link-accent card-title'>{object[title]}</a>
        </Link>
        <div className='overflow-ellipsis overflow-hidden h-10'>{object[description] && object[description as string].split('\n').map((x, i) => <p key={i}>{x}</p>)}</div>
      </div>
    </div>
  );
};

export default Item;
