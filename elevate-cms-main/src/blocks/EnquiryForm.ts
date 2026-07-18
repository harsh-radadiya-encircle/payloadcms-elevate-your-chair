import type { Block } from 'payload';

export const EnquiryForm: Block = {
  slug: 'enquiry-form',
  labels: {
    singular: 'Enquiry Form',
    plural: 'Enquiry Forms',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Form Background Image',
      required: false,
      filterOptions: {
        mimeType: { in: ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'] },
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'redirectLink',
          type: 'select',
          required: true,
          defaultValue: 'reference',
          options: [
            { label: 'Internal Page', value: 'reference' },
            { label: 'Custom URL', value: 'url' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          admin: {
            condition: (_, siblingData) => siblingData?.redirectLink === 'url',
          },
        },
        {
          name: 'pageReference',
          type: 'relationship',
          relationTo: ['pages'],
          label: 'Page',
          admin: {
            condition: (_, siblingData) => siblingData?.redirectLink === 'reference',
          },
        },
      ],
    },
  ],
};
