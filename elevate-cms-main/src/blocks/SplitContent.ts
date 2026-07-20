import type { Block } from 'payload';
import { styleTab } from '@/fields/styleTab';
import { Button } from '@/fields/Button';
import {
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const SplitContent: Block = {
  slug: 'split-content',
  imageURL: '/thumbnails/split-content-block.png',
  imageAltText: 'Split Content Block Thumbnail',
  interfaceName: 'SplitContentBlock',
  labels: {
    singular: 'Split Content (Text/Image)',
    plural: 'Split Content Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
    {
      name: 'layout',
      type: 'radio',
      label: 'Image Alignment (Desktop)',
      options: [
        { label: 'Image on Left', value: 'image-left' },
        { label: 'Image on Right', value: 'image-right' },
      ],
      defaultValue: 'image-left',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
      name: 'preHeading',
      type: 'text',
      label: 'Normal Heading (e.g. "WELCOME TO" or "WHY")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading (e.g. "ELEVATE YOUR CHAIR")',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      maxRows: 2,
      fields: Button,
    },
          ],
        },
        styleTab,
      ],
    },
  ],
};
