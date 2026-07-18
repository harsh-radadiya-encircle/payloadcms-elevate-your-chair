import type { Field } from 'payload';

export const Button: Field[] = [
  {
    name: 'style',
    type: 'select',
    defaultValue: 'outline',
    options: [
      { label: 'Solid', value: 'solid' },
      { label: 'Outline', value: 'outline' },
      { label: 'Link', value: 'link' },
    ],
  },
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
    label: 'Button Icon (Optional)',
  },
  {
    name: 'url',
    type: 'text',
    label: 'URL',
    required: true,
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Open in a New Tab?',
    defaultValue: false,
  },
  {
    type: 'row',
    fields: [
      {
        name: 'backgroundColor',
        type: 'text',
        label: 'Custom Background Color (e.g. #cdbfae or transparent)',
      },
      {
        name: 'textColor',
        type: 'text',
        label: 'Custom Text Color (e.g. #ffffff or #000000)',
      },
    ],
  },
];
