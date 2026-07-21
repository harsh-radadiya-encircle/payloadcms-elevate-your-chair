import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';
import {
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const StorySection: Block = {
  slug: 'story-section',
  interfaceName: 'StorySectionBlock',
  imageURL: '/thumbnails/StorySection-block.png',
  imageAltText: 'Story Section Block Thumbnail',
  labels: {
    singular: 'Story Section (Text over Image)',
    plural: 'Story Sections',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Image',
              required: true,
              admin: {
                description: 'The full-width image that appears behind the white container.',
              },
            },
            {
              name: 'bgOpacity',
              type: 'number',
              label: 'Background Image Opacity (%)',
              min: 0,
              max: 100,
              defaultValue: 10,
              admin: {
                description: 'Set the opacity of the background image from 0 (invisible) to 100 (fully visible).',
                condition: (_, siblingData) => Boolean(siblingData.backgroundImage),
              },
            },
            {
              name: 'preHeading',
              type: 'text',
              label: 'Pre-Heading (e.g. "OUR")',
            },
            {
              name: 'mainHeading',
              type: 'text',
              label: 'Main Heading (e.g. "BRAND STORY")',
              required: true,
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Story Content',
              required: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  HTMLConverterFeature({}),
                ],
              }),
            },
            lexicalHTML('content', { name: 'content_html' }),
          ],
        },
        styleTab,
      ],
    },
  ],
};
