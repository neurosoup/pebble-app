import { Epic } from '../../../graphql';
import { FormMapping } from '../../components/templates/Form';

const EPIC_FORM_MAPPING: FormMapping<Epic> = {
  groups: [
    {
      orientation: 'Horizontal',
      fields: [{ fieldName: 'title', placeholder: "Titre de l'Epic", element: 'input', type: 'text' }],
    },
    {
      orientation: 'Horizontal',
      fields: [
        { fieldName: 'weight', label: 'Poids', element: 'swipe', values: [1, 2, 3] },
        { fieldName: 'size', label: 'Taille', element: 'swipe', values: [0, 1, 2, 3, 5, 8, 13, 21] },
      ],
    },
    {
      orientation: 'Vertical',
      fields: [{ fieldName: 'description', placeholder: "Description de l'Epic", element: 'textarea' }],
    },
  ],
  focus: 'title',
};

export default EPIC_FORM_MAPPING;
