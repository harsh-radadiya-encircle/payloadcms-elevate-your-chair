import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const ContentSection: Block = {
  slug: 'content-section',
  imageURL: '/thumbnails/ContentSection-block.png',
  imageAltText: 'Content Section Block Thumbnail',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
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
        },
        styleTab,
      ],
    },
  ],
};
