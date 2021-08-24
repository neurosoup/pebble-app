import { Project } from '../../graphql';
import { FormMapping } from '../components/templates/Form';

const PROJECT_FORM_MAPPING: FormMapping<Partial<Project>> = {
  fields: [
    { fieldName: 'name', placeholder: 'Nom du projet', element: 'input', type: 'text' },
    { fieldName: 'vision', placeholder: 'Vision du projet', element: 'textarea' },
  ],
  focusFieldName: 'name',
};

export default PROJECT_FORM_MAPPING;
