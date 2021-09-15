import { Story } from '../../../../graphql';
import { FormMapping } from '../../../components/templates/Form';

const STORY_FORM_MAPPING: FormMapping<Story> = {
  groups: [
    {
      fields: [
        { fieldName: 'title', placeholder: 'Titre de la Story', element: 'input', type: 'text' },
        { fieldName: 'description', placeholder: 'Description de la Story', element: 'textarea' },
      ],
    },
  ],
  focus: 'title',
};

export default STORY_FORM_MAPPING;
