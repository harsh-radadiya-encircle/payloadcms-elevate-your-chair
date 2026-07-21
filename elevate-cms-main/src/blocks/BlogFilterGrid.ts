import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const BlogFilterGrid: Block = {
  slug: 'blog-filter-grid',
  imageURL: '/thumbnails/BlogFilterGrid-block.png',
  imageAltText: 'Blog Filter Grid Block Thumbnail',
  interfaceName: 'BlogFilterGridBlock',
  labels: {
    singular: 'Blog Filter Grid',
    plural: 'Blog Filter Grids',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'preHeading',
              type: 'text',
              label: 'Normal Heading (Optional)',
            },
            {
              name: 'mainHeading',
              type: 'text',
              label: 'Bold Heading (Optional)',
            },
            {
              name: 'theme',
              type: 'select',
              label: 'Design Theme',
              defaultValue: 'light',
              options: [
                { label: 'Light (White Background)', value: 'light' },
                { label: 'Dark (Black Background)', value: 'dark' },
                { label: 'Beige (Sand Background)', value: 'beige' },
              ],
              required: true,
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image (Optional)',
            },
            {
              name: 'imageOpacity',
              type: 'number',
              label: 'Background Image Opacity (0 to 100)',
              defaultValue: 30,
              admin: {
                condition: (_, siblingData) => Boolean(siblingData?.backgroundImage),
              },
            },
          ],
        },
        styleTab,
      ],
    },
  ],
};
