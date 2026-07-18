import type { Field } from 'payload';

export const NavigationLinks: Field = {
  type: 'group',
  fields: [
    {
      name: 'linkType',
      type: 'select',
      required: true,
      defaultValue: 'url',
      options: [
        { label: 'Custom URL', value: 'url' },
        { label: 'Internal Page', value: 'reference' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'url',
          },
        },
        {
          name: 'pageReference',
          type: 'relationship',
          relationTo: ['pages'],
          label: 'Page',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'reference',
          },
        },
      ],
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in a New Tab?',
      defaultValue: false,
    },
    {
      name: 'dropdownLinks',
      type: 'array',
      label: 'Dropdown Links',
      required: false,
      fields: [
        {
          name: 'linkType',
          type: 'select',
          required: true,
          defaultValue: 'url',
          options: [
            { label: 'Custom URL', value: 'url' },
            { label: 'Internal Page', value: 'reference' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'url',
              },
            },
            {
              name: 'pageReference',
              type: 'relationship',
              relationTo: ['pages'],
              label: 'Page',
              admin: {
                condition: (_, siblingData) => siblingData?.linkType === 'reference',
              },
            },
          ],
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in a New Tab?',
          defaultValue: false,
        },
      ],
    },
  ],
};
