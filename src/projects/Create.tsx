import { useMutation, gql, MutationTuple } from '@apollo/client';
import { AddProjectInput, Mutation } from '../../graphql';
import Form from './Form';

export interface NewProjectProperties {
  onClose: VoidFunction;
}

const Create = ({ onClose }: NewProjectProperties) => {
  const [addProjectMutation, addProjectResult]: MutationTuple<Pick<Mutation, 'addProject'>, AddProjectInput> = useMutation(
    gql`
      mutation addProject($name: String!, $vision: String, $owner: String!) {
        addProject(input: { name: $name, vision: $vision, owner: $owner }) {
          project {
            id
            name
            vision
          }
        }
      }
    `,
    {
      update: (cache, { data: { addProject } }) => {
        cache.modify({
          fields: {
            queryProject(existing = []) {
              const newProjectRef = cache.writeFragment({
                data: addProject.project[0],
                fragment: gql`
                  fragment NewProject on Project {
                    id
                    name
                    vision
                  }
                `,
              });
              return [...existing, newProjectRef];
            },
          },
        });
      },
    }
  );

  return (
    <div className={`card lg:card-side bordered shadow shadow-md bg-base-100 compact md:col-span-3 lg:col-span-4`}>
      <div className='card-body'>
        <Form
          onSubmit={(updated) => {
            updated.name && addProjectMutation({ variables: { ...(updated as AddProjectInput), owner: 'tech@l-z.fr' } });
            onClose();
          }}
          onCancel={() => onClose()}
        />
      </div>
    </div>
  );
};

export default Create;
