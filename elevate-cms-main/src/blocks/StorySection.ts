import type { Block } from 'payload';
import {
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const StorySection: Block = {
  slug: 'story-section',
  interfaceName: 'StorySectionBlock',
  labels: {
    singular: 'Story Section (Text over Image)',
    plural: 'Story Sections',
  },
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
};
