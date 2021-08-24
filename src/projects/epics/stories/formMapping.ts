import { Story } from '../../../../graphql';
import { FormMapping } from '../../../components/templates/Form';

const STORY_FORM_MAPPING: FormMapping<Partial<Story>> = {
  fields: [
    { fieldName: 'title', placeholder: 'Titre de la Story', element: 'input', type: 'text' },
    { fieldName: 'description', placeholder: 'Description de la Story', element: 'textarea' },
  ],
  focusFieldName: 'title',
};

export default STORY_FORM_MAPPING;
