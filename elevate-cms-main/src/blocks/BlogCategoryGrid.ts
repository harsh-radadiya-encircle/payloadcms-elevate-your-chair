import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const BlogCategoryGrid: Block = {
  slug: 'blog-category-grid',
  interfaceName: 'BlogCategoryGridBlock',
  labels: {
    singular: 'Blog Category Grid',
    plural: 'Blog Category Grids',
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
      label: 'Normal Heading (e.g. "ELEVATED")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading (e.g. "MORNINGS")',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'blog-categories',
      required: true,
      label: 'Select Category to Display',
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
