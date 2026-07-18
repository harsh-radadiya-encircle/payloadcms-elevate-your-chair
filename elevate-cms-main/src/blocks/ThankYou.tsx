import type { Block } from 'payload';

export const ThankYou: Block = {
  slug: 'thank-you',
  labels: {
    singular: 'Thank You',
    plural: 'Thank You',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
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
      name: 'label',
      type: 'text',
      required: true,
    },
  ],
};
