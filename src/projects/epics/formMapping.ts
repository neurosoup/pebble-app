import { Epic } from '../../../graphql';
import { FormMapping } from '../../components/templates/Form';

const EPIC_FORM_MAPPING: FormMapping<Epic> = {
  fields: [
    { fieldName: 'title', placeholder: "Titre de l'Epic", element: 'input', type: 'text' },
    { fieldName: 'description', placeholder: "Description de l'Epic", element: 'textarea' },
  ],
  focusFieldName: 'title',
};

export default EPIC_FORM_MAPPING;
