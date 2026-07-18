import type { Block } from 'payload';
import {
  lexicalEditor,
  HTMLConverterFeature,
  lexicalHTML
} from '@payloadcms/richtext-lexical';

export const ImageGridSection: Block = {
  slug: 'image-grid-section',
  imageURL: '/thumbnails/ImageGridSection-block.png', // Fallback
  imageAltText: 'Image Grid Section Thumbnail',
  interfaceName: 'ImageGridSectionBlock',
  labels: {
    singular: 'Image Grid',
    plural: 'Image Grid Blocks',
  },
  fields: [
    {
      name: 'preHeading',
      type: 'text',
      label: 'Normal Heading (e.g. "HOW MEMBERS")',
    },
    {
      name: 'mainHeading',
      type: 'text',
      label: 'Bold Heading (e.g. "GET REWARDS")',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'text',
      label: 'Subheading (e.g. "Earn Badges as You Grow")',
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
    {
      name: 'images',
      type: 'array',
      label: 'Grid Images',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Text below image (e.g. "COMPLETING EDUCATION CLASSES")',
        },
      ],
    },
  ],
};
