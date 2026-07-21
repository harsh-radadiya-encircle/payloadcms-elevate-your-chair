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
    name: 'solidAnimation',
    type: 'select',
    label: 'Animation',
    defaultValue: 'none',
    admin: {
      condition: (_, siblingData) => siblingData?.style === 'solid',
    },
    options: [
      { label: 'None', value: 'none' },
      { label: 'Circle Fill', value: 'circle-fill' },
    ],
  },
  {
    name: 'outlineAnimation',
    type: 'select',
    label: 'Animation',
    defaultValue: 'none',
    admin: {
      condition: (_, siblingData) => siblingData?.style === 'outline',
    },
    options: [
      { label: 'None', value: 'none' },
      { label: 'Border Trace', value: 'border-trace' },
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
    admin: {
      description: 'The uploaded icon will automatically inherit the Text Color of the button.',
    },
  },
  {
    name: 'linkType',
    type: 'radio',
    defaultValue: 'custom',
    options: [
      { label: 'Custom URL', value: 'custom' },
      { label: 'Internal Page', value: 'internal' },
    ],
  },
  {
    name: 'url',
    type: 'text',
    label: 'Custom URL',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'custom' || !siblingData?.linkType,
    },
  },
  {
    name: 'internalLink',
    type: 'relationship',
    relationTo: ['pages', 'blog-posts'],
    label: 'Internal Page',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData?.linkType === 'internal',
    },
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
        admin: {
          description: 'This color will also apply to the Button Icon.',
        },
      },
    ],
  },
  {
    type: 'row',
    fields: [
      {
        name: 'hoverBackgroundColor',
        type: 'text',
        label: 'Hover Background Color (e.g. #ffffff)',
        admin: {
          condition: (_, siblingData) => siblingData?.style === 'solid',
        },
      },
      {
        name: 'hoverTextColor',
        type: 'text',
        label: 'Hover Text Color (e.g. #000000)',
        admin: {
          condition: (_, siblingData) => siblingData?.style === 'solid',
        },
      },
    ],
  },
];
