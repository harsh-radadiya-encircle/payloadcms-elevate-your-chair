import type { Block } from 'payload';

export const ContentSection: Block = {
  slug: 'content-section',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Textual Content',
      admin: {
        description: 'Use this field for full page formatted textual content.',
      },
    },
  ],
};
