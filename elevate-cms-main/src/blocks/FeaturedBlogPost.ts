import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const FeaturedBlogPost: Block = {
  slug: 'featured-blog-post',
  interfaceName: 'FeaturedBlogPostBlock',
  labels: {
    singular: 'Featured Blog Post',
    plural: 'Featured Blog Posts',
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
      label: 'Pre-Heading (e.g. "FEATURED")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Main Heading (e.g. "WELLNESS READ")',
      required: true,
      defaultValue: 'WELLNESS READ',
    },
    {
      name: 'post',
      type: 'relationship',
      relationTo: 'blog-posts',
      required: true,
      label: 'Select Blog Post to Feature',
    },
          ],
        },
        styleTab,
      ],
    },
  ],
};
