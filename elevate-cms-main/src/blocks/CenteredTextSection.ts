import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';
import {
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const CenteredTextSection: Block = {
  slug: 'centered-text-section',
  interfaceName: 'CenteredTextSectionBlock',
  labels: {
    singular: 'Centered Text',
    plural: 'Centered Text Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color (e.g. #ffffff or #1a1a1a)',
      defaultValue: '#f9f9f9',
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color (e.g. #1a1a1a or #ffffff)',
      defaultValue: '#1a1a1a',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image (Optional)',
      admin: {
        description: 'If provided, this image will appear as a background covering the section.',
      },
    },
    {
      name: 'preHeading',
      type: 'text',
      label: 'Normal Heading (e.g. "IN-PERSON")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading (e.g. "LEARNING")',
    },
    {
      name: 'subHeading',
      type: 'text',
      label: 'Subheading (e.g. "In-Person Learning Offers")',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description Text',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('description', { name: 'description_html' }),
          ],
        },
        styleTab,
      ],
    },
  ],
};
