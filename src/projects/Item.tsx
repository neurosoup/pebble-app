import { gql, MutationTuple, useMutation } from '@apollo/client';
import Link from 'next/link';
import { Mutation, ProjectFilter } from '../../graphql';

export interface ProjectElementProperties {
  id?: string;
  name?: string;
  vision?: string;
}

const Item = ({ id, name, vision }: ProjectElementProperties) => {
  return (
    <div className='card lg:card-side shadow shadow-md compact bg-base-200'>
      <div className='card-body'>
        <Link href={`/${encodeURIComponent(id)}`}>
          <a className='link link-hover link-accent card-title'>{name}</a>
        </Link>
        <div className='overflow-ellipsis overflow-hidden h-10'>{vision && vision.split('\n').map((x, i) => <p key={i}>{x}</p>)}</div>
        {/* <div className='justify-end card-actions'>
          <button className='btn btn-sm btn-circle btn-ghost' onClick={() => deleteProject({ variables: { id } })}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Item;
