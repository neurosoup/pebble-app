import { useMutation, gql } from '@apollo/client';
import { Mutation, Project } from '../../graphql';
import DeleteTemplate from '../components/templates/Delete';

interface Props {
  project: Project;
}

const Delete = ({ project }: Props) => {
  const [deleteProjectMutation, __] = useMutation<Pick<Mutation, 'deleteProject'>, { id: string }>(
    gql`
      mutation deleteProject($id: ID!) {
        deleteProject(filter: { id: [$id] }) {
          msg
          project {
            id
            name
          }
        }
      }
    `,
    {
      update: (cache) => {
        cache.modify({
          fields: {
            queryProject(existing = [], { readField }) {
              return existing.filter((x) => readField('id', x) !== project.id);
            },
          },
        });
      },
    }
  );

  const deleteProject = async (object: Project) => {
    await deleteProjectMutation({ variables: { id: object.id } });
  };

  return <DeleteTemplate object={project} onDelete={deleteProject} redirect='/' />;
};

export default Delete;
