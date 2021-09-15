import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Mutation } from '../../../graphql';

import Markdown from '../../components/Markdown';
import SwipeInput from '../SwipeInput';
import { FormMapping } from './Form';
import DetailsTemplate from './Details';

interface Props<T extends { id?: string }, D extends Pick<Mutation, keyof Mutation>, V = any> {
  object: T;
  titleProperty: keyof T;
  descriptionProperty: keyof T;
  formMapping: FormMapping<T, V>;
  updateMutationFunction?: (options?: MutationFunctionOptions<D, T>) => Promise<FetchResult<D>>;
}

const Item = <T extends { id?: string }, D extends Pick<Mutation, keyof Mutation>, V = any>({ object, formMapping, updateMutationFunction, titleProperty, descriptionProperty }: Props<T, D, V>) => {
  const router = useRouter();
  const parts = router.pathname.split('/').filter((x) => x.length);
  const path = parts.reduce((previous, current) => {
    const part = current.replace('[', '').replace(']', '');
    const id = router.query[part];
    return `${previous}/${id}`;
  }, '');
  const href = `${path}/${object.id}`;
  return (
    <div className='card compact bg-base-200 h-96 filter drop-shadow-md'>
      <div className='card-body overflow-hidden'>
        <DetailsTemplate object={object} formMapping={formMapping} readonly />
        <Link href={href}>
          <a className='link link-hover link-accent'>Modifier</a>
        </Link>
        {/* {parts.length && (
          <div className='flex flex-row self-start p-2'>
            <SwipeInput label='Poids' values={[1, 2, 3]} />
            <SwipeInput label='Taille' />
          </div>
        )}
        <div className='max-h-64 overflow-y-auto'>
          <Markdown children={`${object[descriptionProperty]}`} />
        </div> */}
      </div>
    </div>
  );
};

export default Item;

// className={`${i === a.length - 1 ? 'flex-none' : 'flex-shrink'} overscroll-y-auto overflow-ellipsis`}
