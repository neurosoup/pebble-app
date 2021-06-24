import { gql, QueryResult, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Create from './Create';
import Item from './Item';
import { QueryQueryProjectArgs, Query } from '../../graphql';

const List = () => {
  const [create, setCreate] = useState(false);

  const {
    loading,
    data,
  }: QueryResult<Pick<Query, 'queryProject'>, QueryQueryProjectArgs> = useQuery(gql`
    query queryProjects {
      queryProject {
        id
        name
        vision
      }
    }
  `);

  useEffect(() => {
    const handleTab = (e) => {
      if (e.keyCode === 187) {
        setCreate(true);
      }
    };
    window.addEventListener('keydown', handleTab);

    return () => {
      window.removeEventListener('keydown', handleTab);
    };
  }, []);

  return (
    <div className='grid items-center grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 m-2'>
      {!loading && data.queryProject.map((element) => <Item key={element.id} id={element.id} name={element.name} vision={element.vision} />)}
      {!create && (
        <button
          className='btn btn-circle btn-primary justify-self-center md:col-span-3'
          onClick={() => {
            setCreate(true);
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
          </svg>
        </button>
      )}
      {create && <Create onClose={() => setCreate(false)} />}
    </div>
  );
};

export default List;
