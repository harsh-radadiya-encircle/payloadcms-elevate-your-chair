import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';

export const FeaturedBlogPost: Block = {
  slug: 'featured-blog-post',
  interfaceName: 'FeaturedBlogPostBlock',
  imageURL: '/thumbnails/FeaturedBlogPost-block.png',
  imageAltText: 'Featured Blog Post Thumbnail',
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
              name: 'posts',
              type: 'relationship',
              relationTo: 'blog-posts',
              hasMany: true,
              required: true,
              label: 'Select Blog Posts to Feature',
            },
          ],
        },
        styleTab,
      ],
    },
  ],
};
